const express = require("express");
const centreController = require("../controllers/centre");
const BodyParser = require("body-parser");
const jsonParser = BodyParser.json();
const jwt = require("jsonwebtoken");

const router = express.Router();
//Routes des fonctions liées aux centres 

router.post("/SearchCentres", function (req, res) {
    centreController.SearchCentres(
      req.body.text,
      req, res).then((result) => {
      console.log(result);
      res.send(result);
    })
    .catch((err) => {
      res.send(err);
    });
  })



module.exports = router;
