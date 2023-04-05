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
    if (req.cookies.joes) {
      try {
        const decode = await promisify(jwt.verify)(
          req.cookies.joes,
          process.env.JWT_SECRET
        );
        db.query(
          "select * from events",
          (err, results) => {
            if (err) {
                console.log(err);
                return next(err);
              }
              req.events = results;
              return next();
            }
          );
      } catch (error) {
        console.log(error);
        return next();
      }
    } else {
      next();
    }
  };