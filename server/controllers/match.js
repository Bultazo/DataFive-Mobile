const mysql = require("mysql");
const jwt = require("jsonwebtoken");
const bcryptjs = require("bcryptjs");
const cookieParser = require("cookie-parser");
const dotenv = require("dotenv");
const { response } = require("express");
dotenv.config({ path: "./../.env" });
var bodyParser = require("body-parser");
const nodemailer = require("nodemailer");
const math = require("math-random");
const { json } = require("body-parser");

const db = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "",
  database: "datafive",
});

module.exports = {
  create: async function (id, hour, hour_end, centre, date, req, res) {
    let _resolve, _reject;
    const dbQueryPromise = new Promise((resolve, reject) => {
      _resolve = resolve;
      _reject = reject;
    });

    try {
      function makeid(length) {
        var result = "";
        var characters =
          "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
        var charactersLength = characters.length;
        for (var i = 0; i < length; i++) {
          result += characters.charAt(
            Math.floor(Math.random() * charactersLength)
          );
        }
        return result;
      }

      const id_du_match = makeid(6);
      console.log(id_du_match);

      const VerifyPseudoMatch = "SELECT * FROM matchs where pseudo_match = ?";
      db.query(VerifyPseudoMatch, id_du_match, async (err, result) => {
        console.log(result);
        if (err) {
          console.log(err);
        } else if (result.length > 0) {
          console.log("Cet Id match est déja utilisé !");
          _resolve(false);
        } else {
          const insertMatch =
            "INSERT INTO matchs (hour, hour_end ,date, created_by, pseudo_match, id_centre) values (?,?,?,?,?,?)";
          db.query(
            insertMatch,
            [hour, hour_end, date, id, id_du_match, centre],
            async (error, results) => {
              if (error) {
                console.log(error);
              } else {
                console.log(results);
                console.log("Match ajouté !");
                console.log(id);
                const selectMatch =
                  "select * from matchs where pseudo_match = ?";
                db.query(selectMatch, [id_du_match], async (err, result) => {
                  if (err) {
                    console.log(err);
                  } else {
                    const id_match = result[0].id;
                    console.log(id_match);

                    const insertUser_match =
                      "insert into users_match (equipe, match_id, users_id) values (?,?,?)";
                    db.query(
                      insertUser_match,
                      [1, id_match, id],
                      async (error, results) => {
                        if (error) {
                          console.log(error);
                        } else {
                          console.log(results);
                          console.log("Bien ouej");
                          res.status(200).json({
                            status: "success",
                            data: id_du_match,
                          });
                        }
                      }
                    );
                  }
                });
              }
            }
          );
        }
      });
    } catch (err) {
      console.log(err);
    }

    return await dbQueryPromise;
  },

  search: async function (pseudo_match, req, res) {
    let _resolve, _reject;
    const dbQueryPromise = new Promise((resolve, reject) => {
      _resolve = resolve;
      _reject = reject;
    });

    try {
      const VerifyPseudoMatch = "SELECT * FROM matchs where pseudo_match = ?";
      db.query(VerifyPseudoMatch, pseudo_match, async (err, result) => {
        console.log(result);
        if (err) {
          console.log(err);
        } else if (!result.length) {
          console.log("Cet ID match n'existe pas !");

          res.json({
            status: "wrong",
            message: "Ce match n'existe pas !",
          });
        } else {
          const id = result[0].created_by;
          console.log("CET ID");
          console.log(id);

          console.log(result);

          const GetName = "Select pseudo from users where id = ?";
          db.query(GetName, id, async (error, results) => {
            if (error) {
              console.log(error);
            } else if (!results.length) {
              console.log("Cet Utilisateur n'existe pas !");
            } else {
              res.status(200).json({
                status: "success",
                Pseudo: results,
                data: result,
              });
            }
          });
        }
      });
    } catch (err) {
      console.log(err);
    }

    return await dbQueryPromise;
  },

  GetPlayers: async function (pseudo_match, req, res) {
    let _resolve, _reject;
    const dbQueryPromise = new Promise((resolve, reject) => {
      _resolve = resolve;
      _reject = reject;
    });

    try {
      const GetMatch = "select * from matchs where pseudo_match = ?";
      db.query(GetMatch, [pseudo_match], async (err, result) => {
        console.log(result);
        if (err) {
          console.log(err);
        } else {
          console.log(result);

          const id_match = result[0].id;
          const createur = result[0].created_by;
          console.log(id_match);
          console.log(createur)


          //const GetPlayers = "SELECT users.pseudo as 'key' FROM users_match, users where users.id = users_match.users_id and match_id = ?"
          const GetPlayers1 =
            "SELECT users.pseudo as 'key', users_match.equipe FROM users_match, users where users.id = users_match.users_id and match_id = ? and equipe = 1";
          db.query(GetPlayers1, id_match, async (error, results) => {
            if (error) {
              console.log(error);
            } else {
              const GetPlayers2 =
                "SELECT users.pseudo as 'key', users_match.equipe FROM users_match, users where users.id = users_match.users_id and match_id = ? and equipe = 2";

              db.query(GetPlayers2, id_match, async (err, resultats) => {
                if (err) {
                  console.log(err);
                } else {
                  const GetEkip =
                    "SELECT users.pseudo, users_match.equipe as 'key' FROM users_match, users where users.id = users_match.users_id and match_id = ?";

                  db.query(GetEkip, id_match, async (errors, resultat) => {
                    if (errors) {
                      console.log(errors);
                    } else {

                      const GetCreator = "select pseudo from users where id = ?"
                      db.query(GetCreator, createur, async (erroor, ResultCreator) => {
                        if (erroor) {
                          console.log(erroor)
                        } else {
                          res.status(200).json({
                            status: "success",
                            data: results,
                            data2: resultats,
                            ekip: resultat,
                            MyCreator : ResultCreator
                          });
                        }
                      })

                   
                    }
                  });
                }
              });
              //const GetEkip = "SELECT * from users_match where match_id = ?"
            }
          });
        }
      });
    } catch (err) {
      console.log(err);
    }

    return await dbQueryPromise;
  },

  GetCentres: async function (id_centre, req, res) {
    let _resolve, _reject;
    const dbQueryPromise = new Promise((resolve, reject) => {
      _resolve = resolve;
      _reject = reject;
    });

    try {
      const GetCentre = "select * from centre where id = ?";
      db.query(GetCentre, [id_centre], async (err, result) => {
        console.log(result);
        if (err) {
          console.log(err);
        } else {
          console.log(result);

          res.status(200).json({
            status: "success",
            data: result,
          });
        }
      });
    } catch (err) {
      console.log(err);
    }

    return await dbQueryPromise;
  },

  join: async function (id, id_match, equipe, req, res) {
    console.log(id_match);
    console.log(id);
    console.log(equipe);

    let _resolve, _reject;
    const dbQueryPromise = new Promise((resolve, reject) => {
      _resolve = resolve;
      _reject = reject;
    });

    try {
      const Verif =
        "Select users_id from users_match where match_id = ? and users_id = ?";

      db.query(Verif, [id_match, id], async (error, results) => {
        console.log(results);

        if (error) {
          console.log(error);
        } else if (results.length > 0) {
          res.json({
            status: "failed",
            message: "Vous faites déja partie de l'équipe",
          });
        } else {
          const insertUser =
            "insert into users_match (equipe, match_id, users_id) values (?,?,?)";
          db.query(insertUser, [equipe, id_match, id], async (err, result) => {
            console.log(result);
            if (err) {
              console.log(err);  
            } else {
              console.log(result);
              res.status(200).json({
                status: "success",
                data: result,
              });
            }
          });
        }
      });
    } catch (err) {
      console.log(err);
    }

    return await dbQueryPromise;
  },

  VerifyUser: async function (id, id_match, req, res) {
    let _resolve, _reject;
    const dbQueryPromise = new Promise((resolve, reject) => {
      _resolve = resolve;
      _reject = reject;
    });

    try {
      const Verif =
        "Select users_id from users_match where match_id = ? and users_id = ?";

      db.query(Verif, [id_match, id], async (error, results) => {
        console.log(results);

        if (error) {
          console.log(error);
        } else if (results.length > 0) {
          res.json({
            status: "wrong",
            message: "Vous faites déja partie de l'équipe",
          });
        }
      });
    } catch (err) {
      console.log(err);
    }

    return await dbQueryPromise;
  },

  Left: async function (id, id_match, req, res) {
    let _resolve, _reject;
    const dbQueryPromise = new Promise((resolve, reject) => {
      _resolve = resolve;
      _reject = reject;
    });

    try {
      const VerifCreator = "SELECT created_by from matchs where id = ?";
      db.query(VerifCreator, id_match, async (err, result) => {
        const creator = result[0].created_by;
        if (err) {
          console.log(err);
        } else if (id == creator) {
          const Delete = "Delete from users_match where match_id = ?";
          db.query(Delete, id_match, async (errors, resultats) => {
            if (errors) {
              console.log(errors);
            } else {
              const Delete2 = "Delete from matchs where id = ?";
              db.query(Delete2, id_match, async (Myerror, Myresults) => {
                if (Myerror) {
                  console.log(Myerror);
                } else {
                  res.json({
                    status: "Sup",
                    message: "Vous avez supprimé la réservation",
                  });
                }
              });
            }
          });
        } else {
          const drop =
            "DELETE FROM users_match where match_id = ? and users_id = ?";

          db.query(drop, [id_match, id], async (error, results) => {
            console.log(results);

            if (error) {
              console.log(error);
            } else {
              res.json({
                status: "Left",
                message: "Vous avez quitter l'équipe",
              });
            }
          });
        }
      });
    } catch (err) {
      console.log(err);
    }

    return await dbQueryPromise;
  },

  centres: async function (req, res) {
    let _resolve, _reject;
    const dbQueryPromise = new Promise((resolve, reject) => {
      _resolve = resolve;
      _reject = reject;
    });

    try {
      const CheckCentres = "Select * from centre";
      db.query(CheckCentres, async (err, result) => {
        console.log(result);
        if (err) {
          console.log(err);
        } else {
          console.log(result);
          res.status(200).json({
            data: result,
          });
        }
      });
    } catch (err) {
      console.log(err);
    }

    return await dbQueryPromise;
  },



  SearchMatchs: async function (id_user, text ,req, res, ) {
    let _resolve, _reject;
    const dbQueryPromise = new Promise((resolve, reject) => {
      _resolve = resolve;
      _reject = reject;
    });

    try {
      const CheckUsers = "Select * from users_match where users_id = ?";
      db.query(CheckUsers, [id_user], async (err, result) => {
        if (err) {
          console.log(err);
        } else {
          var Array = [];

          for (var i = 0; i < result.length; i++) {
            var MesId = result[i].match_id;
            console.log(MesId);
            Array.push(MesId);
          }
          console.log("cest mon tab");
          console.log(Array);

          const Futur = "(" + Array.join(",") + ")";

          const GetMatchs = `Select * from matchs where id IN ${Futur} AND  (score_A like ? or score_B like ? or date like ? or pseudo_match like ?)`;
          db.query(GetMatchs, ['%'+ text + '%','%'+ text + '%', '%'+ text + '%', '%'+ text + '%'],async (error, results) => {
            if (error) {
              console.log(error);
            } else {
              console.log(results);
              res.status(200).json({
                status: "good",
                data: results,
              });
            }
          });
        }
      });
    } catch (err) {
      console.log(err);
    }

    return await dbQueryPromise;
  },


 


  GetMatchs: async function (req, res, id_user) {
    let _resolve, _reject;
    const dbQueryPromise = new Promise((resolve, reject) => {
      _resolve = resolve;
      _reject = reject;
    });

    try {
      const CheckUsers = "Select * from users_match where users_id = ?";
      db.query(CheckUsers, [id_user], async (err, result) => {
        if (err) {
          console.log(err);
        } else {
          var Array = [];

          for (var i = 0; i < result.length; i++) {
            var MesId = result[i].match_id;
            console.log(MesId);
            Array.push(MesId);
          }
          console.log("Tab");
          console.log(Array);

          const Futur = "(" + Array.join(",") + ")";

          const GetMatchs = `Select * from matchs where id IN ${Futur}`;
          db.query(GetMatchs, async (error, results) => {
            if (error) {
              console.log(error);
            } else {
              console.log(results);
              res.status(200).json({
                status: "good",
                data: results,
              });
            }
          });
        }
      });
    } catch (err) {
      console.log(err);
    }

    return await dbQueryPromise;
  },


  ValiderScore: async function (req, res, ScoreA, ScoreB, id_match) {
    let _resolve, _reject;
    const dbQueryPromise = new Promise((resolve, reject) => {
      _resolve = resolve;
      _reject = reject;
    });

    try {
      const ChangeScore = "Update matchs SET Score_A = ? , Score_B = ? where pseudo_match = ?";
      db.query(ChangeScore, [ScoreA, ScoreB, id_match], async (err, result) => {
        if (err) {
          console.log(err);
        } else {
          console.log("Validation")
          console.log(result)
          res.status(200).json({
            status: "Validation",
            data: result,
          });


          
        }
      });
    } catch (err) {
      console.log(err);
    }

    return await dbQueryPromise;
  },



  GetJson: async function (req, res, id, id_match) {
    let _resolve, _reject;
    const dbQueryPromise = new Promise((resolve, reject) => {
      _resolve = resolve;
      _reject = reject;
    });

    try {
      const Json = "select json_data from stats where user_id = ? and match_id = ?";
      db.query(Json, [id, id_match], async (err, result) => {
        if (err) {
          console.log(err);
        } else {

          const ekipUser = "select equipe from users_match where users_id = ? and match_id = ?";
      db.query(ekipUser, [id, id_match], async (errors, resultat) => {
        if (errors) {
          console.log(errors);
        } else {

          const Equipe = resultat[0].equipe

          const GetUsersFromSameTeam = "select users_id from users_match where equipe = ? and match_id = ?"
db.query(GetUsersFromSameTeam, [Equipe, id_match], async (MyError, MyResults) => {

  if(MyError) {
    console.log(MyError)
  } else {

    var Arrayy = [];


    for (var i = 0; i < MyResults.length; i++) {

      var MesId = MyResults[i].users_id
      


      Arrayy.push(MesId)


    }

    const Futur = "(" + Arrayy.join(",") + ")";

    var max = 0;

    const AllStats = `select json_data from stats where user_id IN ${Futur} AND ( match_id = ?) `;
    db.query(AllStats, [id_match], async (error , results) => {
      if(error) {
        console.log(error)
      } else {

        var AllStatsArray = [];

        for (var i = 0; i < results.length; i++) {
      
          var usersStats = results[i].json_data
          var UsersStatsParse = JSON.parse(usersStats)
          var MaxLength  = UsersStatsParse.jeuParMinute.length


          

          console.log(MaxLength)

          if(MaxLength > max ) {

            max = MaxLength

          }

     
          
          AllStatsArray.push(UsersStatsParse.jeuParMinute)





        }


        


       



        


        var MoyenneStats = [];
        for (var i = 0; i < max; i++) {

          var nbr = 0;
          var oneColSum = 0;

          for (var j = 0; j < AllStatsArray.length; j++) {


            if (typeof AllStatsArray[j][i] !== 'undefined' ) {

              oneColSum += AllStatsArray[j][i];
              nbr++;


            }

          }

          MoyenneStats.push(Math.round(oneColSum/nbr))

        }

        let Interval = []
      let nbrPas = []
      for (let i = 0; i < MoyenneStats.length; i++) {
        const element = MoyenneStats[i];
        // Check if i is multiple of 10
        if (i%10 == 0) {
          // Get index element of i
          let k = MoyenneStats.indexOf(element)

          //Slice by interval 
          let test = MoyenneStats.slice(k-10, k)

          // Push value on 2 differents array
          Interval.push(i)
          nbrPas.push(test)
          // obj.push({
          //    time : i,
          //    nbrPas : test
          // })
        }
      } 
      console.log("this is Interval : ", Interval);
      console.log("this is Nombre de pas : ", nbrPas);


        res.status(200).json({
          data: result,
          Moyenne : MoyenneStats,
          Interval : Interval,
        });


        
       

      }
    })




   

  }


  


})


          
        



      

         




          

         


          
        }
      });





















        




          

         


          
        
      



       


          
        }
      });
    } catch (err) {
      console.log(err);
    }

    return await dbQueryPromise;
  },



  GetStat: async function (req, res, id, id_match) {
    let _resolve, _reject;
    const dbQueryPromise = new Promise((resolve, reject) => {
      _resolve = resolve;
      _reject = reject;
    });

    try {
      const Json = "select * from stats where user_id = ? and match_id = ?";
      db.query(Json, [id, id_match], async (err, result) => {
        if (err) {
          console.log(err);
        } else {
          
          console.log(result)
          res.status(200).json({
            data: result,
          });


          
        }
      });
    } catch (err) {
      console.log(err);
    }

    return await dbQueryPromise;
  },



  GetAllStats: async function (req, res, id) {
    console.log(id)
    let _resolve, _reject;
    const dbQueryPromise = new Promise((resolve, reject) => {
      _resolve = resolve;
      _reject = reject;
    });

    try {
      const AllStats = "select * from stats where user_id = ?";
      db.query(AllStats, [id], async (err, result) => {
        if (err) {
          console.log(err);
        } else {

          var DistanceArray = [];
          var CaloriesArray = [];
          var DribblesArray = [];
          var AccelerationArray = [];
          var ButsArray = [];
          var nombreMatch = 0

          for (var i = 0; i < result.length; i++) {
            var MyDistance = result[i].km_parcourus;
            var MyCalories = result[i].calories;
            var MyDribbles = result[i].changement_appui;
            var MyAcceleration = result[i].acceleration;
            var MyButs = result[i].nmb_but;



            DistanceArray.push(MyDistance);
            CaloriesArray.push(MyCalories);
            DribblesArray.push(MyDribbles);
            AccelerationArray.push(MyAcceleration);
            ButsArray.push(MyButs);

            nombreMatch++


          }


          var MoyenneAcceleration = (AccelerationArray.reduce((a, b) => a + b, 0)) / nombreMatch
          var MoyenneDistance = (DistanceArray.reduce((a, b) => a + b, 0)) / nombreMatch
          var MoyenneCalories = (CaloriesArray.reduce((a, b) => a + b, 0)) / nombreMatch
          var MoyenneDribbles = (DribblesArray.reduce((a, b) => a + b, 0)) / nombreMatch


         

          console.log(result)
          res.status(200).json({
            Distance: DistanceArray,
            Calories : CaloriesArray,
            Dribbles : DribblesArray,
            Acceleration : AccelerationArray,
            Buts : ButsArray,
            MoyenneAcceleration : MoyenneAcceleration,
            MoyenneDistance : MoyenneDistance,
            MoyenneCalories : MoyenneCalories,
            MoyenneDribbles : MoyenneDribbles
          });


          
        }
      });
    } catch (err) {
      console.log(err);
    }

    return await dbQueryPromise;
  },

  GetLastMatch: async function (req, res, id) {
    console.log(id)
    let _resolve, _reject;
    const dbQueryPromise = new Promise((resolve, reject) => {
      _resolve = resolve;
      _reject = reject;
    });

    try { 
      const AllMatchsOFUser = "select * from users_match where users_id = ?";
      db.query(AllMatchsOFUser, [id], async (err, result) => {
        if (err) {
          console.log(err);
        } else {


          var Array = [];

          for (var i = 0; i < result.length; i++) {
            var MesId = result[i].match_id;
            console.log(MesId);
            Array.push(MesId);
          }
          console.log("Tab");
          console.log(Array);

          const Futur = "(" + Array.join(",") + ")";


          const GetMatchs = `Select * from matchs where id IN ${Futur} AND  score_A IS NOT null AND score_B is not null ORDER BY date DESC`;

            db.query(GetMatchs, async (error, results) => {
              if (error) {
                console.log(error)
              } else {

                const dernierMatch = results[0]

                const ScoreA = results[0].score_A

                const ScoreB = results[0].score_B


                console.log(ScoreA, ScoreB)

                const id_match = results[0].id
                
                const centre = results[0].id_centre

                let  FinDeMatch;  


                const GetFinalScore = "Select equipe from users_match where users_id = ? and match_id = ?"
                db.query(GetFinalScore, [id, id_match], async (errors, resultat) => {

                  if(errors) {
                    console.log(errors)
                  } else {
                    var EquipeOfUser = resultat[0].equipe


                    if ( ScoreA > ScoreB && EquipeOfUser == 1 || ScoreB > ScoreA && EquipeOfUser == 2 ) {

                      FinDeMatch = "Victoire"

                    } else if(ScoreA == ScoreB) {
                      FinDeMatch = "Egalité"
                    } else {
                      FinDeMatch = "Defaite"
                    }
                    

                    const GetCentre = "select name from centre where id = ?";
                    db.query(GetCentre, centre, async (erreur, data) => {
                      if (erreur) {
                        console.log(erreur)
                      } else {

                        const AllStats = "select * from stats where user_id = ? and match_id = ?";
                        db.query(AllStats, [id, id_match], async (err, result) => {
                          if (err) {
                            console.log(err);
                          } else {



            

                            const NomDuCentre = data[0].name

                  
                            var DistanceArray = [];
                            var CaloriesArray = [];
                            var DribblesArray = [];
                            var AccelerationArray = [];
                            var ButsArray = [];

                  
                            for (var i = 0; i < result.length; i++) {
                              var MyDistance = result[i].km_parcourus;
                              var MyCalories = result[i].calories;
                              var MyDribbles = result[i].changement_appui;
                              var MyAcceleration = result[i].acceleration;
                              var MyButs = result[i].nmb_but;





                  
                  
                              DistanceArray.push(MyDistance);
                              CaloriesArray.push(MyCalories);
                              DribblesArray.push(MyDribbles);
                              AccelerationArray.push(MyAcceleration);
                              ButsArray.push(MyButs);
                  
                  
                            }
                           
                  
                            console.log(result)
                           


                            const GetAllStatsOfPlayers = "Select * from stats where match_id = ?";
                            db.query(GetAllStatsOfPlayers, id_match, async (MyErrors, MyResults) => {
                              if(MyErrors) {
                                console.log(MyErrors)
                              }else {

                                var MyUsers = [];



                                for (var i = 0; i < MyResults.length; i++) {
                                  var MesId = MyResults[i].user_id;
                                  
                                  MyUsers.push(MesId);
                                }




                                const Futur = "(" + MyUsers.join(",") + ")";

                                const GetPseudo = `Select pseudo from users where id IN ${Futur}`;
                                db.query(GetPseudo,async (MesErreurs, MesResult) => {
                                  if(MesErreurs) {
                                    console.log(MesErreurs)
                                  } else {
                      
                                    var UsersPseudoArray = [];
                      
                                    for (var i = 0; i < MesResult.length; i++) {
                                      var UsersPseudo = MesResult[i].pseudo
                                      UsersPseudoArray.push(UsersPseudo)
                                    }


                                    const GetScoreAndPseudo = "select * from stats join users ON stats.user_id = users.id where match_id = ?"
                                    db.query(GetScoreAndPseudo, id_match, async (LesErreurs, LesResultats) => {

                                      if(LesErreurs) {
                                        console.log(LesErreurs)
                                      } else {


                                        var LesConcurrents = [];
                                        for (var i = 0; i < LesResultats.length; i++) {
                                          var LesPseudos = LesResultats[i].pseudo
                                          var LesDribbles = LesResultats[i].changement_appui
                                  var LesAccel = LesResultats[i].acceleration 
                                  var LesDistances  = LesResultats[i].km_parcourus

                                  var LeCalcul = LesDistances + LesAccel + LesDribbles


                                          LesConcurrents.push({
                                            Name : LesPseudos,
                                            Score : LeCalcul
                                          })
                                        }

                                        var MeilleurPerformeur = LesConcurrents.sort(function(a,b) {
                                          return b.Score - a.Score
                                        })


                                


                                        
                                    res.status(200).json({
                                      data : dernierMatch,
                                      ScoreFinal : FinDeMatch,
                                      Centre : NomDuCentre,
                                      Distance: DistanceArray,
                                      Calories : CaloriesArray,
                                      Dribbles : DribblesArray,
                                      Acceleration : AccelerationArray,
                                      Buts : ButsArray,
                                      MyData : MyResults,
                                      MyUsers : UsersPseudoArray,
                                      Performeur : MeilleurPerformeur
                                    });



                                      }


                                    })







                                  }

                                })






                               
                                
                              }
                            })


                            

                     
                  
                            
                          }
                        });











                      }
                    })







                    
              
                  }

                })







              }
            })
        

          
        }
      });
    } catch (err) {
      console.log(err);
    }

    return await dbQueryPromise;
  },


  


  
  GetStatsAllPlayers: async function (req, res, id) {
    let _resolve, _reject;
    const dbQueryPromise = new Promise((resolve, reject) => {
      _resolve = resolve;
      _reject = reject;
    });

    try {
      const AllStats = "select user_id ,km_parcourus, passe_de, arret_goal, nmb_but, changement_appui, nombre_tir  from stats where match_id = ?";
      db.query(AllStats, [id], async (err, result) => {
        if (err) {
          console.log(err);
        } else {

          console.log(result) 

          var UsersIdArray = [];


        
          var DistanceArray = [];
          var CaloriesArray = [];
          var DribblesArray = [];
          var ButsArray = [];
          var PassesArray = [];
          var UsersArray = [];
          var TirArray = [];
          var ArretGoal = [];




          for (var i = 0; i < result.length; i++) {
            var MyDistance = result[i].km_parcourus;
           // var MyCalories = result[i].calories;
            var MyDribbles = result[i].changement_appui;
           var MyButs = result[i].nmb_but;
            var MyPasses = result[i].passe_de;
            var MyTir = result[i].nombre_tir
            var MyUsers = result[i].user_id
            var MyArret = result[i].arret_goal

            DistanceArray.push(MyDistance);
          //  CaloriesArray.push(MyCalories);
            DribblesArray.push(MyDribbles);
            ButsArray.push(MyButs);
            PassesArray.push(MyPasses)
            UsersIdArray.push(MyUsers)
            TirArray.push(MyTir)
            ArretGoal.push(MyArret)
          }


           //On a les totaux pour calculer la possession ! -------------------------------------------//

    var TotalNombreTirs = TirArray.reduce((a, b) => a + b , 0)
    var TotalNombrePasses = PassesArray.reduce((a, b) => a + b , 0)
    var TotalDribbles = DribblesArray.reduce((a, b) => a + b , 0)
    var TotalDistance = DistanceArray.reduce((a, b) => a + b , 0)
    var TotalButs = ButsArray.reduce((a, b) => a + b , 0)
    var TotalArret = ArretGoal.reduce((a, b) => a + b , 0)




    var Total = TotalNombrePasses + TotalDribbles + TotalNombreTirs

//----------------------------------------------------------------------------------------//   



//--------------Total du nombre de dribbles + nombre de passes decisives + nombre tirs de CHAQUE JOUEUR !! ------------------------//
var TotalUnique = [];

var InteretPourLeJeu = [];


for (var i = 0; i < result.length; i++) {

  //Ca cest pour la possession

  var MyUniqueTotal = result[i].changement_appui + result[i].nombre_tir + result[i].passe_de;

  //-----------------------------------//







 TotalUnique.push(MyUniqueTotal)
}

//---------------------------------------------------------------------------------------------------------------------///

//Calcul de la possession de CHAQUE JOUEUR ----------------------------------------//


var PossessionUnik = [];

for (var i = 0; i < TotalUnique.length; i++) {

  var MyPossession = (TotalUnique[i] / Total) * 100;



 PossessionUnik.push(MyPossession)
}


//-------------------------------------------------------------------------//

           
for (var i = 0; i < result.length; i++) {

  for (var i = 0; i < PossessionUnik.length; i++) {

    var MyInteret = (((result[i].km_parcourus * 20) / TotalDistance ) + ((result[i].nmb_but * 20)/ TotalButs) + ((result[i].passe_de *20)/ TotalNombrePasses) + ((result[i].arret_goal * 20) / TotalArret) + ((PossessionUnik[i]) * 20) /100) 

InteretPourLeJeu.push(MyInteret)

  }

  //Ca cest pour linteret !!


  //-----------------------------------//


  



} 



   




          const Futur = "(" + UsersIdArray.join(",") + ")";

          const GetPseudo = `Select pseudo from users where id IN ${Futur}`;
          db.query(GetPseudo,async (error, results) => {
            if(error) {
              console.log(error)
            } else {

              var UsersPseudoArray = [];

              for (var i = 0; i < results.length; i++) {
            
                var UsersPseudo = results[i].pseudo
                UsersPseudoArray.push(UsersPseudo)
    
    
              }



 res.status(200).json({
                
            Interet : InteretPourLeJeu,
            users : UsersPseudoArray
           
          });
         




             
            }
          } )



          



         /* var DistanceArray = [];
          var CaloriesArray = [];
          var DribblesArray = [];
          var AccelerationArray = [];
          var ButsArray = [];
          var PassesArray = [];
          var UsersArray = [];




          for (var i = 0; i < result.length; i++) {
            var MyDistance = result[i].km_parcourus;
            var MyCalories = result[i].calories;
            var MyDribbles = result[i].changement_appui;
            var MyAcceleration = result[i].acceleration;
            var MyButs = result[i].nmb_but;
            var MyPasses = result[i].passe_de;
            var MyUsers = result[i].user_id


            DistanceArray.push(MyDistance, MyCalories, MyDribbles,MyAcceleration,MyButs,MyPasses,MyUsers);
            CaloriesArray.push(MyCalories);
            DribblesArray.push(MyDribbles);
            AccelerationArray.push(MyAcceleration);
            ButsArray.push(MyButs);
            PassesArray.push(MyPasses)
            UsersArray.push(MyUsers)


          }*/
         
         


          
        }
      });
    } catch (err) {
      console.log(err);
    }

    return await dbQueryPromise;
  },

/*
  GetStatsOfMatch: async function (req, res, id, matchid) {
    console.log(id)
    let _resolve, _reject;
    const dbQueryPromise = new Promise((resolve, reject) => {
      _resolve = resolve;
      _reject = reject;
    });

    try {
      const AllStats = "select * from stats where user_id = ? and match_id = ?";
      db.query(AllStats, [id, matchid], async (err, result) => {
        if (err) {
          console.log(err);
        } else {

          var DistanceArray = [];
          var CaloriesArray = [];
          var DribblesArray = [];
          var AccelerationArray = [];
          var ButsArray = [];

          for (var i = 0; i < result.length; i++) {
            var MyDistance = result[i].km_parcourus;
            var MyCalories = result[i].calories;
            var MyDribbles = result[i].changement_appui;
            var MyAcceleration = result[i].acceleration;
            var MyButs = result[i].nmb_but;


            DistanceArray.push(MyDistance);
            CaloriesArray.push(MyCalories);
            DribblesArray.push(MyDribbles);
            AccelerationArray.push(MyAcceleration);
            ButsArray.push(MyButs);


          }
         

          console.log(result)
          res.status(200).json({
            Distance: DistanceArray,
            Calories : CaloriesArray,
            Dribbles : DribblesArray,
            Acceleration : AccelerationArray,
            Buts : ButsArray
          });


          
        }
      });
    } catch (err) {
      console.log(err);
    }

    return await dbQueryPromise;

    
  TestMoyenne: async function (req, res, user_id, match_id) {
    let _resolve, _reject;
    const dbQueryPromise = new Promise((resolve, reject) => {
      _resolve = resolve;
      _reject = reject;
    });

    try {
      const AllStatsUser = "select * from stats where user_id = ? and match_id = ?";
      db.query(AllStatsUser, [user_id, match_id], async (err, result) => {
        if (err) {
          console.log(err);
        } else {

        


          var max = 0;
          const MyDataListPlayers = [];

          const AllStats = "select json_data from stats where match_id = ?";
          db.query(AllStats, [match_id], async (error , results) => {
            if(error) {
              console.log(error)
            } else {

              var AllStatsArray = [];

              for (var i = 0; i < results.length; i++) {
            
                var usersStats = results[i].json_data
                var UsersStatsParse = JSON.parse(usersStats)
                var MaxLength  = UsersStatsParse.jeuParMinute.length

                console.log(MaxLength)

                if(MaxLength > max ) {

                  max = MaxLength

                }
                
                AllStatsArray.push(UsersStatsParse.jeuParMinute)
    
    
              }


              var MoyenneStats = [];
              for (var i = 0; i < max; i++) {

                var nbr = 0;
                var oneColSum = 0;

                for (var j = 0; j < AllStatsArray.length; j++) {


                  if (typeof AllStatsArray[j][i] !== 'undefined' ) {

                    oneColSum += AllStatsArray[j][i];
                    nbr++;


                  }

                }

                MoyenneStats.push(Math.round(oneColSum/nbr))

              }



              res.status(200).json({
                status: "success",
                data: MoyenneStats,
              });

             

            }
          })




          

         


          
        }
      });
    } catch (err) {
      console.log(err);
    }

    return await dbQueryPromise;
  },

    




    
  },*/


  TestMoyenne: async function (req, res, user_id, match_id) {
    let _resolve, _reject;
    const dbQueryPromise = new Promise((resolve, reject) => {
      _resolve = resolve;
      _reject = reject;
    });

    try {
      const ekipUser = "select equipe from users_match where users_id = ? and match_id = ?";
      db.query(ekipUser, [user_id, match_id], async (errors, resultat) => {
        if (errors) {
          console.log(errors);
        } else {

          const Equipe = resultat[0].equipe

          const GetUsersFromSameTeam = "select users_id from users_match where equipe = ? and match_id = ?"
db.query(GetUsersFromSameTeam, [Equipe, match_id], async (MyError, MyResults) => {

  if(MyError) {
    console.log(MyError)
  } else {

    var Array = [];


    for (var i = 0; i < MyResults.length; i++) {

      var MesId = MyResults[i].users_id
      Array.push(MesId)


    }

    const Futur = "(" + Array.join(",") + ")";




    res.status(200).json({
      status: "success",
      data: Array,
    });

  }


  


})


          
        



      

         




          

         


          
        }
      });
    } catch (err) {
      console.log(err);
    }

    return await dbQueryPromise;
  },


};
