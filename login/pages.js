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

router.get("/home", userController.isLoggedIn, (req, res) => {
  if (req.user) {
    res.render("home", { user: req.user });
  } else {
    res.redirect("/login");
  }
});

router.get("/home", eventController.listOfEvents, (req, res) => {
  if(req.body) {
    res.render("home", {events: req.body});
  }
});

router.get("/home", userController.logout, (req, res) => {
  res.redirect("/login");
});

module.exports = router;