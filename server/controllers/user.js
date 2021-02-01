const mysql = require("mysql");
const jwt = require("jsonwebtoken");
const bcryptjs = require("bcryptjs");
const cookieParser = require("cookie-parser");
const dotenv = require("dotenv");
const { response } = require("express");
dotenv.config({ path: "./../.env" });
var bodyParser = require("body-parser");
const nodemailer = require("nodemailer");

//let testAccount = await nodemailer.createTestAccount();

// create reusable transporter object using the default SMTP transport

// send mail with defined transport object


const Activation = process.env.JWT_ACC_ACTIVATE



const db = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "",
  database: "datafive",
});

module.exports = {
  GetName: async function (email, req, res) {
    let _resolve, _reject;
    const dbQueryPromise = new Promise((resolve, reject) => {
      _resolve = resolve;
      _reject = reject;
    });
    try {
      const SelectInfo = "SELECT name, firstname from users where email = ?";
      db.query(SelectInfo, email, async (error, results) => {
        console.log(results);
        //  id = results[0].id;
        name = results[0].name;
        firstname = results[0].firstname;

        if (error) {
          console.log("CA cest lerreur 1" + error);
        } else if (!results || results.length == 0) {
          console.log("User Not Found !");
          res.status(400).json({
            message: "User Not Found",
          });
        } else {
          console.log("Success For requesting name and firstname !"),
            res.status(200).json({
              status: "success",
              data: results,
            });
        }
      });
    } catch (err) {
      console.log(err);
    }
    return await dbQueryPromise;
  },

  inscription: async function (email, password, passwordConfirm, req, res) {
    let _resolve, _reject;
    const dbQueryPromise = new Promise((resolve, reject) => {
      _resolve = resolve;
      _reject = reject;
    });

    console.log(email, password, passwordConfirm);

    try {
      const selectemail = "SELECT email FROM users where email = ?";
      db.query(selectemail, [email], async (err, result) => {
        console.log(result)
        if (err) {
          console.log(err);
        } else if (result.length > 0) {
          console.log("Il existe déja un compte avec cette adresse mail !"),
            _resolve(false);
        } else {

          const hashpassword =  bcryptjs.hashSync(password, 8);
          console.log(hashpassword);
          const insert =
            "insert into users (email, password) VALUES (?,?)";
          db.query(
            insert,
            [email, hashpassword],
            async (error, results) => {
              if (error) {
                console.log(error)
              } else {
                console.log(results);
                console.log("compte crée !");

                console.log(Activation)
                        const token = jwt.sign({email, password}, Activation, {expiresIn : '3d'})
    
    
                    let transporter = nodemailer.createTransport({
                      host: 'smtp.gmail.com',
                      port: 587,
                      secure: false,
                      requireTLS: true,
                      auth: {
                          user: 'noreplydatafive@gmail.com',
                          pass: 'datafive123'
                      }
                  });
                  let mailOptions = {
                      from: 'noreplydatafive@gmail.com',
                      to: email,
                      subject: 'Activation du compte',
                      html: `
                      <h2>Veuillez cliquer sur ce lien afin d'activer votre compte ! </h2>
                      <p>${process.env.CLIENT_URL}/activation/${token}</p>
                      
                      `
                  };

                  transporter.sendMail(mailOptions, (error, info) => {
                    if (error) {
                        return console.log(error.message);
                    }else {
                      console.log('success');

                      res.status(200).json({
                        status: "success",
                        
                      });
                    }
                });
                
              }
            }
          )

              
             
          
          
        }
      });
    } catch (error) {
      console.log(error);
      throw new Error(error);
    }
    return await dbQueryPromise;
  },


  activation: async function (token,req, res) {
    let _resolve, _reject;
    const dbQueryPromise = new Promise((resolve, reject) => {
      _resolve = resolve;
      _reject = reject;
    });


    try {
      console.log(token)
      if (token) {
      await jwt.verify(token, Activation, function (error, decoded) {
        console.log("Verification")
          if (error) {
            console.log(error)
          }
  else {
          const {email, password} = decoded;
          console.log(email)
        

          const CheckValidation = "UPDATE users SET checked = 'true' WHERE email = ?"
          db.query(CheckValidation, email,  async (err, result) => {

            if (err) {
              console.log(err)
            } else {

              console.log("Ok")
              _resolve(true)
              
            }
             
          }
          )
}    })
  
      }else {
        console.log('Pas de token')
      }
     
    } catch (error) {
      console.log(error);
      throw new Error(error);
    }
    return await dbQueryPromise;
  },



  

  login: async function (email, password, req, res) {
    let _resolve, _reject;
    const dbQueryPromise = new Promise((resolve, reject) => {
      _resolve = resolve;
      _reject = reject;
    });
    try {
      const sqlEmail = "Select * from users where email = ?";

      db.query(sqlEmail, email, async (error, results) => {
        if (error) {
          throw (new Error(error), console.log(error));
        }
        if (!results || results.length == 0) {
          throw (
            (new Error("User Not Found"),
            console.log("verifie ton email"),
            _resolve(false))
          );
        }
        UserId = results[0].id;
        checked = results[0].checked
        console.log("Checked ?")
        console.log(checked)

        if (!(await bcryptjs.compare(password, results[0].password))) {
        console.log("ca va pas")
            console.log("wrong password")
            res.json({
              status: "wrong",
              message : "wrong password"
            });
            
        
        } else if (checked == 'false') {
          console.log("Email non verifié")

          res.json({
            status: "failed",
            message : "not verified"

          });


        }
        
        
        else {
          
          console.log("Ok")
          jwt.sign({ UserId }, "secretkey", (err, token) => {
            res.json({
              token,
              status: "success",
              data: results,
            });
          });
        }
      });
      
    } catch (error) {
      console.log("Erreur Serveur" + error);
    }
    return await dbQueryPromise;
  },

  complete: async function (
    name,
    firstname,
    email,
    gender,
    date,
    weight,
    size,
    req,
    res
  ) {
    let _resolve, _reject;
    const dbQueryPromise = new Promise((resolve, reject) => {
      _resolve = resolve;
      _reject = reject;
    });
    try {
      const SelectionId = "SELECT * from users where email = ?";
      db.query(SelectionId, email, async (error, results) => {
        console.log(results);
        id = results[0].id;

        console.log(id);
        if (error) {
          console.log("CA cest lerreur 1" + error);
        } else if (!results || results.length == 0) {
          console.log("User Not Found !");
          res.status(400).json({
            message: "User Not Found",
          });
        } else {
          const UpdateComplete =
            "UPDATE users set name = ?, firstname = ?, gender = ?, date_naissance = ?,weight = ?, size = ? WHERE id = ?";
          db.query(
            UpdateComplete,
            [name, firstname, gender, date, weight, size, id],
            async (err, result) => {
              if (err) {
                console.log(err),
                  res.status(400).json({
                    message: "Cannot Update The Query !",
                  });
              } else {
                console.log("Good Job !"),
                  res.status(200).json({
                    status: "success",
                    message: "Good Job",
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

  profile: async function (id, email, pseudo, weight, size, image, req, res) {
    let _resolve, _reject;
    const dbQueryPromise = new Promise((resolve, reject) => {
      _resolve = resolve;
      _reject = reject;
    });

    try {
      console.log(id);
      const selectID = "Select * from users where id = ?";
      db.query(selectID, id, async (error, results) => {
        console.log(results);
        const id = results[0].id;
        if (error) {
          console.log(error);
        } else if (!results || results.lenght == 0) {
          console.log("User Not Found !");
          res.status(400).json({
            message: "User Not Found",
          });
        }
        else {
          if (image == null) {
            console.log("Tes dans le sans image !");
            const FoundPseudo = "Select pseudo from users where pseudo = ? AND id != ?";
            db.query(FoundPseudo, [pseudo, id], async(err, results) => {
              console.log("on rentre dans la boucle !")
              console.log(results)
              if (err) {
                console.log("on est dans l'erreur");
                console.log(err);
              }else if (!results || results.length == 0) {
                console.log("pseudo dispo");
                const UpdateWithoutImage =
                "UPDATE users set email = ?, pseudo = ? ,weight = ?, size = ? WHERE id = ?";
              db.query(
                UpdateWithoutImage,
                [email, pseudo ,weight, size, id],
                async (err, result) => {
                  if (err) {
                    console.log(err);
                  } else if (!result || result.length == 0) {
                    throw (
                      (new Error("User Not Found"),
                      console.log("User Not Found To Change The Profile !"))
                    );
                  } else {
                    const selectNewData = "select * from users where id = ?";
                    db.query(selectNewData, id, async (Myerror, MyResults) => {
                      if (Myerror) {
                        console.log(Myerror);
                      } else if (!MyResults || MyResults.lenght == 0) {
                        (console.log = "Can Not Find User !"),
                          res.status(400).json({
                            status: "Failed",
                            message: "User Not Found",
                          });
                      } else {
                        console.log("Successful Change !");
                        res.status(200).json({
                          status: "success",
                          message: "Good Job",
                          data: MyResults,
                        });
                      }
                    });
                  }
                }
              );
              } else {
                /*const Newresult = JSON.parse(JSON.stringify(results));
                const Mypseudo = Newresult[0].pseudo;
                console.log(Mypseudo);
                console.log(pseudo)*/

               
                  console.log("Pseudo déja utilisé !");
                res.json({
                  status: "Failed",
                  message  : "Pseudo déja utilisé !"
                })
              }
            }
            
            );
          } else {
            console.log("Avec l'image")
            const FoundPseudo = "Select pseudo from users where pseudo = ? AND id != ?";
            db.query(FoundPseudo, [pseudo, id], async(err, results) => {
              console.log("on rentre dans la boucle !")
              console.log(results)
              if (err) {
                console.log("on est dans l'erreur");
                console.log(err);
              }else if (!results || results.length == 0) {
                console.log("pseudo dispo");
                const UpdateWithoutImage =
                "UPDATE users set email = ?, pseudo = ? ,weight = ?, size = ?, image = ? WHERE id = ?";
              db.query(
                UpdateWithoutImage,
                [email, pseudo ,weight, size, image,  id],
                async (err, result) => {
                  if (err) {
                    console.log(err);
                  } else if (!result || result.length == 0) {
                    throw (
                      (new Error("User Not Found"),
                      console.log("User Not Found To Change The Profile !"))
                    );
                  } else {
                    const selectNewData = "select * from users where id = ?";
                    db.query(selectNewData, id, async (Myerror, MyResults) => {
                      if (Myerror) {
                        console.log(Myerror);
                      } else if (!MyResults || MyResults.lenght == 0) {
                        (console.log = "Can Not Find User !"),
                          res.status(400).json({
                            status: "Failed",
                            message: "User Not Found",
                          });
                      } else {

                        

                        console.log("Successful Change !");
                        res.status(200).json({
                          status: "success",
                          message: "Good Job",
                          data: MyResults,
                        });
                      }
                    });
                  }
                }
              );
              } else {
                /*const Newresult = JSON.parse(JSON.stringify(results));
                const Mypseudo = Newresult[0].pseudo;
                console.log(Mypseudo);
                console.log(pseudo)*/

               
                  console.log("Pseudo déja utilisé !");
                res.json({
                  status: "Failed",
                  message  : "Pseudo déja utilisé !"
                })
              }
            }
            
            );
          }
        }
      });
    } catch (err) {
      console.log(err);
    }

    return await dbQueryPromise;
  },



  
  MostFrequentCenter: async function (id_user,req, res) {
    let _resolve, _reject;
    const dbQueryPromise = new Promise((resolve, reject) => {
      _resolve = resolve;
      _reject = reject;
    });


    try {

      const GetIdMatchOfTheUser = "Select match_id from users_match where users_id = ?"
        db.query(GetIdMatchOfTheUser, id_user, async (err, result) => {
          if (err) {
            console.log(err)
          } else {

            var ArrayMatchs = [];

            for (var i = 0; i < result.length; i++) {
              var MesMatchsId = result[i].match_id;
              console.log(MesMatchsId);
              ArrayMatchs.push(MesMatchsId);
            }


            const Futur = "(" + ArrayMatchs.join(",") + ")";


            const CentresID = `select id_centre, COUNT(id_centre) AS MOST_FREQUENT from matchs where id IN ${Futur} GROUP BY id_centre ORDER BY COUNT(id_centre) DESC   `;
            db.query(CentresID, async (error, results) => {
              if(error) {
                console.log(error)
              } else {


                var CentresId = [];

                for (var i = 0; i < results.length; i++) {
                  var MesCentresId = results[i].id_centre;
                  console.log(MesCentresId);
                  CentresId.push(MesCentresId);
                }


                const Centres = "(" + CentresId.join(",") + ")";


                const CentreNames = `Select Name, id from centre where id IN ${Centres}`;
                db.query(CentreNames, async(errors, resultat) => {
                  if(errors) {
                    console.log(errors)
                  } else {

                    res.status(200).json({
                      data: resultat,
                    });
    
                    
                  }
                })


              


                
              }
             
            } )


       
          }
        })

      
    } catch (error) {
      console.log(error);
      throw new Error(error);
    }
    return await dbQueryPromise;
  },



  
  ModifyPassword: async function (id_user,password,newpassword,req, res) {
    let _resolve, _reject;
    const dbQueryPromise = new Promise((resolve, reject) => {
      _resolve = resolve;
      _reject = reject;
    });


    try {

      const sqlUser = "Select * from users where id = ?";
      db.query(sqlUser, id_user, async (error, result) => {
        if(error) {
          
          console.log(error)
        } else {
          console.log(result[0].password)


          if (!(await bcryptjs.compare(password, result[0].password))) {
           console.log("Password Does Not Match")

           res.status(200).json({
            status: "failed",
            message: "Votre mot de passe actuel est inccorect !"
            
          });
                
            
            }

 else {

              console.log("It's ok")
              

              const HashedPassword = bcryptjs.hashSync(newpassword, 8)

              const UpdatePassword ="UPDATE users set password = ? WHERE id = ?";
              db.query(UpdatePassword, [HashedPassword, id_user], async (err, result) => {
                if (err) {
                  console.log(err)
                } else {

                  res.status(200).json({
                    status: "success",
                    message: "Votre message a bien été modifié !"
                    
                  });

                }
              })



            }


        }
      })








      
    } catch (error) {
      console.log(error);
      throw new Error(error);
    }
    return await dbQueryPromise;
  },
};
