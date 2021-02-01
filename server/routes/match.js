const express = require("express");
const matchController = require("../controllers/match");
const BodyParser = require("body-parser");
const jsonParser = BodyParser.json();
const jwt = require("jsonwebtoken");
const match = require("../controllers/match");

const router = express.Router();


//routes dans le serveur de tout ce qui a un lien avec les matchs 


router.post("/create", function (req, res) {

    matchController.
    create(
        req.body.id,
        req.body.hour, 
        req.body.hour_end,
        req.body.centre,
        req.body.date, 
        req,
        res)
    .then((result) => {
        console.log(result);
        res.send(result);
      })
      .catch((err) => {
        res.send(err);
      });
    
})


router.post("/search", function (req, res) {

  matchController.
  search(
      req.body.pseudo_match,
      req,
      res)
  .then((result) => {
      console.log(result);
      res.send(result);
    })
    .catch((err) => {
      res.send(err);
    });
  
})


router.post("/SearchMatchs", function (req, res) {
  matchController.SearchMatchs(
    req.body.id_user,
    req.body.text,
    req, res).then((result) => {
    console.log(result);
    res.send(result);
  })
  .catch((err) => {
    res.send(err);
  });
})



router.post("/join", function (req, res) {

  matchController.
  join(
      req.body.id,
      req.body.id_match, 
      req.body.equipe, 
      req,
      res)
  .then((result) => {
      console.log(result);
      res.send(result);
    })
    .catch((err) => {
      res.send(err);
    });
  
})

router.post("/VerifyUser", function (req, res) {
  matchController.VerifyUser(
    req.body.id,
    req.body.id_match, 
    req,
    res
  ) .then((result) => {
    console.log(result);
    res.send(result);
  })
  .catch((err) => {
    res.send(err);
  });
})


router.post("/Left", function (req, res) {
  matchController.Left(
    req.body.id,
    req.body.id_match, 
    req,
    res
  ) .then((result) => {
    console.log(result);
    res.send(result);
  })
  .catch((err) => {
    res.send(err);
  });
})





router.post("/GetPlayers", function(req, res) {
  matchController.GetPlayers(
    req.body.pseudo_match,
    req,
    res
  ) .then((result) => {
    console.log(result);
    res.send(result);
  })
  .catch((err) => {
    res.send(err);
  });
})


router.post("/GetCentres", function(req, res) {
  matchController.GetCentres(
    req.body.id_centre,
    req,
    res
  ) .then((result) => {
    console.log(result);
    res.send(result);
  })
  .catch((err) => {
    res.send(err);
  });
})



router.post("/centres", function (req, res) {
  matchController.centres(req, res).then((result) => {
    console.log(result);
    res.send(result);
  })
  .catch((err) => {
    res.send(err);
  });
})








router.post("/GetMatchs", function (req, res) {
  matchController.GetMatchs(
    req, 
    res, 
    req.body.id_user
    ).then((result) => {
    console.log(result);
    res.send(result);
  })
  .catch((err) => {
    res.send(err);
  });
})




router.post("/ValiderScore", function (req, res) {
  matchController.ValiderScore(
    req, 
    res, 
    req.body.ScoreA,
    req.body.ScoreB,
    req.body.id_match
    ).then((result) => {
    console.log(result);
    res.send(result);
  })
  .catch((err) => {
    res.send(err);
  });
})



router.post("/GetJson", function (req, res) {
  matchController.GetJson(
    req, 
    res, 
    req.body.id,
    req.body.id_match,
    ).then((result) => {
    console.log(result);
    res.send(result);
  })
  .catch((err) => {
    res.send(err);
  });
})


router.post("/GetStat", function (req, res) {
  matchController.GetStat(
    req, 
    res, 
    req.body.id,
    req.body.id_match,
    ).then((result) => {
    console.log(result);
    res.send(result);
  })
  .catch((err) => {
    res.send(err);
  });
})



router.post("/GetAllStats", function (req, res) {
  matchController.GetAllStats(
    req, 
    res, 
    req.body.id,
    ).then((result) => {
    console.log(result);
    res.send(result);
  })
  .catch((err) => {
    res.send(err);
  });
})

router.post("/GetStatsOfMatch", function (req, res) {
  matchController.GetStatsOfMatch(
    req, 
    res, 
    req.body.id,
    req.body.matchid
    ).then((result) => {
    console.log(result);
    res.send(result);
  })
  .catch((err) => {
    res.send(err);
  });
})



router.post("/GetAllStatsPlayers", function (req, res) {
  matchController.GetAllStatsPlayers(
    req, 
    res, 
    req.body.id,
    ).then((result) => {
    console.log(result);
    res.send(result);
  })
  .catch((err) => {
    res.send(err);
  });
})







router.post("/GetLastMatch", function (req, res) {
  matchController.GetLastMatch(
    req, 
    res, 
    req.body.id,
    ).then((result) => {
    console.log(result);
    res.send(result);
  })
  .catch((err) => {
    res.send(err);
  });
})


router.post("/GetStatsAllPlayers", function (req, res) {

  matchController.GetStatsAllPlayers(
    req, 
    res, 
    req.body.id,
    ).then((result) => {
    console.log(result);
    res.send(result);
  })
  .catch((err) => {
    res.send(err);
  });

})



router.post("/TestMoyenne", function (req, res) {

  matchController.TestMoyenne(
    req, 
    res, 
    req.body.user_id,
    req.body.match_id,

    ).then((result) => {
    console.log(result);
    res.send(result);
  })
  .catch((err) => {
    res.send(err);
  });

})

























module.exports = router;
