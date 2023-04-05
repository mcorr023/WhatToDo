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

exports.listOfEvents = async (req, res, next) => {
    console.log(req.body);
    db.query(
        "select * from events",
        (err, results) => {
            console.log(results);
            if (results<=0) {
                return next();
            }
            req.body = results;
            return next();
        }
    )};