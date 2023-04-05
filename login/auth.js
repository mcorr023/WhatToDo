const express = require("express");
const userController = require("./users");
const eventController = require("./home");
const router = express.Router();

router.post("/register", userController.register);
router.post("/login", userController.login);
router.post("/logout", userController.logout);
router.post("/home",eventController.listOfEvents);

module.exports = router;