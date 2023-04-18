const express = require("express");
const router = express.Router();
const userController = require("./users");
const eventController = require("./events");

router.get(["/", "/login"], (req, res) => {
  res.render("login");
});

router.get("/register", (req, res) => {
  res.render("register");
});


router.get("/profile", eventController.eventList, userController.isLoggedIn, (req, res) => {
  if (req.user, req.body) {
    res.render("profile", { user: req.user, events: req.body });
  } else {
    res.redirect("/login");
  }
});

router.get("/edit_profile", userController.isLoggedIn, (req, res) => {
  if (req.user) {
    res.render("edit_profile", { user: req.user });
  } else {
    res.redirect("/login");
  }
});

router.get("/add_event", eventController.eventList, (req, res) => {
  if (req.body) {
    res.render("add_event", {events: req.body });
  } else {
    res.redirect("/login");
  }
});

router.get("/", userController.isLoggedIn, (req, res) => {
  if (req.user) {
    res.render("home", { user: req.user });
  } else {
    res.redirect("/login");
  }
});

// router.get('/edit/:id', function(req, res, next) {
//   var UserId= req.params.id;
//   var sql=`SELECT * FROM users WHERE id=${UserId}`;
//   db.query(sql, function (err, data) {
//     if (err) throw err;
   
//     res.render('users-form', { title: 'User List', editData: data[0]});
//   });
// });
// router.post('/edit_profile/:id', function(req, res, next) {
// var id= req.params.id;
// var updateData=req.body;
// var sql = `UPDATE users SET ? WHERE id= ?`;
// db.query(sql, [updateData, id], function (err, data) {
// if (err) throw err;
// console.log(data.affectedRows + " record(s) updated");
// });
// res.redirect('/profile');
// });
// module.exports = router;

router.get("/home", userController.isLoggedIn, (req, res) => {
  if (req.body) {
    res.render("home", { user: req.user });
  }
});

module.exports = router;