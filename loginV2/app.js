const express = require("express");
const mysql = require("mysql");
const doenv = require("dotenv");
const path = require("path");
const hbs = require("hbs");
const cookieParser = require("cookie-parser");

const app = express();

doenv.config({
  path: "./.env",
});
const db = mysql.createConnection({
  host: process.env.DATABASE_HOST,
  user: process.env.DATABASE_USER,
  password: process.env.DATABASE_PASS,
  database: process.env.DATABASE,
});

db.connect((err) => {
  if (err) {
    console.log(err);
  } else {
    console.log("MySQL Connection Success");
  }
});
app.use(cookieParser());
app.use(express.urlencoded({ extended: false }));

//console.log(__dirname);
const location = path.join(__dirname, "./public");
app.use(express.static(location));
app.set("view engine", "hbs");

app.use("/", require("./pages"));
app.use("/auth", require("./auth"));

app.post("/add_event", (req, res) => {
  const { eventName, description, type, date, city, state, address } = req.body;

  const newEvent = { eventName, description, type, date, city, state, address };

  const eventsql = 'INSERT INTO events SET ?';
  db.query(eventsql, newEvent, (err, result) => {
    if (err) throw err;

    // redirect the user back to the profile page
    res.redirect("/profile");
  });
});

app.post("/edit_profile", (req, res) => {
  const { firstname, lastname, email, dateofbirth, id } = req.body;

  // update the user record in the database
  const sql = `UPDATE users SET firstname='${firstname}', lastName='${lastname}', email='${email}', dateofbirth='${dateofbirth}' WHERE id='${id}'`;
  db.query(sql, (err, result) => {
    if (err) throw err;

    // redirect the user back to the profile page
    res.redirect("/profile");
  });
});

app.listen(3000, () => {
  console.log("Server Started @ Port 3000");
});