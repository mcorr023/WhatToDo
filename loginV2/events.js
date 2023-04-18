const mysql = require("mysql");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { promisify } = require("util");

const db = mysql.createConnection({
  host: process.env.DATABASE_HOST,
  user: process.env.DATABASE_USER,
  password: process.env.DATABASE_PASS,
  database: process.env.DATABASE,
});

exports.eventList = (req, res, next) => {
    db.query( 
        "select * from events",
        (err, result) => {
            console.log(result);
            if (err) {
                confirm.log(err);
                return next();
              }
            if (result.length <=0) {
                res.render("home", { 
                    msg: "No events to display",
                    msg_type: "error",});
                return next();
            }
            req.body = result;
            return next();
        });
    };