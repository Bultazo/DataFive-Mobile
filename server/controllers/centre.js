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

const db = mysql.createPool({
    host: "localhost",
    user: "root",
    password: "",
    database: "datafive",
  });
  
  module.exports = {


    SearchCentres :  async function (text,req, res) {

        console.log(text)
    
        let _resolve, _reject;
        const dbQueryPromise = new Promise ((resolve, reject) => {
            _resolve = resolve;
            _reject = reject;
        });

        try {
            const CheckCentres = "Select * from centre where name like ? or adress like ?  or city like ? or postal_code like ?"
            db.query(CheckCentres, ['%'+ text + '%','%'+ text + '%','%'+ text + '%','%'+ text + '%'], async (err, result) => {
                console.log(result)
                if (err) {
                    console.log(err);
                } else {
                   res.status(200).json({
                    data: result ,
                  });
                }
            })







           
        } catch (err) {

            console.log(err)

        }
        

return await dbQueryPromise;

    },





  }
