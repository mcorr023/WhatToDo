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

router.get("/profile", userController.isLoggedIn, (req, res) => {
  if (req.user) {
    res.render("profile", { user: req.user });
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


router.get("/home", eventController.eventList, (req, res) => {
  console.log("test");
  if (req.body) {
    res.render("home", { events: req.body });
  }
});

module.exports = router;