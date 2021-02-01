const express = require("express");
const userController = require("../controllers/user");
const BodyParser = require("body-parser");
const user = require("../controllers/user");
const jsonParser = BodyParser.json();
const jwt = require("jsonwebtoken");

const router = express.Router();

//route ayant un lien avec tout ce qui conserve l'utilisateur avec la liaison avec le controller
router.post("/inscription", function (req, res) {
  userController
    .inscription(
      req.body.email,
      req.body.password,
      req.body.passwordConfirm,
      req,
      res
    )
    .then((result) => {
      console.log(result);
      res.send(result);
    })
    .catch((err) => {
      res.send(err);
    });
});

router.get("/GetName", (req, res) => {
  userController
    .GetName(req.body.email, req, res)
    .then((result) => {
      console.log("Result " + result);
      res.send(result);
    })
    .catch((err) => {
      res.send(err);
    });
});



router.post("/login", (req, res, ) => {
  userController
    .login(req.body.email, req.body.password, req, res)
    .then((result) => {
      console.log(result);
      res.send(result);
    })
    .catch((err) => {
      res.send(err);
    });
});

router.post("/complete", function (req, res) {
  userController
    .complete(
      req.body.name,
      req.body.firstname,
      req.body.email,
      req.body.gender,
      req.body.date,
      req.body.weight,
      req.body.size,
      req,
      res
    )
    .then((result) => {
      console.log(result);
      res.send(result);
      res.send({ authData });
    })
    .catch((err) => {
      res.send(err);
    });
});


router.get("/activation/:token", function (req, res) {
  userController.activation(
    req.params.token
  ).then((result) => {
    console.log(result);
    res.send(result);
    res.send({ authData });
  })
  .catch((err) => {
    res.send(err);
  });
})

router.put("/profile", function (req, res) {
      userController
        .profile(
          req.body.id,
          req.body.email,
          req.body.pseudo,
          req.body.weight,
          req.body.size,
          req.body.image,
          req,
          res
        )
        .then((result) => {
          res.send({ status: 200, error: null, response: result, authData });
        })
        .catch((err) => {
          res.send(err);
        });
    
  });


  router.put("/ModifyPassword", function (req, res) {
    userController
      .ModifyPassword(
        req.body.id_user,
        req.body.password,
        req.body.newpassword,
        req,
        res
      )
      .then((result) => {
        console.log(result);
        res.send(result);
      })
      .catch((err) => {
        res.send(err);
      });
});



  


  router.post("/MostFrequentCenter", function (req, res) {
    userController
      .MostFrequentCenter(
        req.body.id_user,
        req,
        res
      )
      .then((result) => {
        console.log(result);
        res.send(result);
        res.send({ authData });
      })
      .catch((err) => {
        res.send(err);
      });
  });







/*
router.put("/profile", verifyToken, function (req, res) {
  jwt.verify(req.token, "secretkey", (err, authData) => {
    if (err) {
      res.sendStatus(403);
      console.log("acces non autorisé !");
    } else {
      userController
        .profile(
          req.body.id,
          req.body.email,
          req.body.age,
          req.body.weight,
          req.body.size
        )
        .then((result) => {
          res.send({ status: 200, error: null, response: result, authData });
        })
        .catch((err) => {
          res.send(err);
        });
    }
  });
});
*/
/*

    router.put('/profile', verifyToken ,function (req,res) {

        jwt.verify(req.token, 'secretkey', (err, authData) => {
            if (err) {
                res.sendStatus(403);
                console.log("acces non autorisé !")
            } else {

                userController.profile(req.body.firstName, req.body.lastName ,req.body.email, req.body.password, req.body.passwordConfirm, req.body.gender, req.body.age, req.body.weight, req.body.size)
        .then(result => {
            res.send({"status": 200, "error": null, "response": result, authData})
        }).catch(err => {
            res.send(err)
        })

            }
        })

        
        
    })*/

function verifyToken(req, res, next) {
  const TknHeader = req.headers["authorization"];
  if (typeof TknHeader !== "undefined") {
    const TknSpace = TknHeader.split(" ");

    const tkn = TknSpace[1];

    req.token = tkn;

    next();
  } else {
    console.log("Acces non autorisé !");
    res.sendStatus(403);
  }
}

module.exports = router;
