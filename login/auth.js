const express = require("express");
const userController = require("./users");
const eventController = require("./events");
const router = express.Router();

router.post("/register", userController.register);
router.post("/login", userController.login);
router.get("/", userController.logout);
router.get("/home",eventController.listOfEvents);

module.exports = router;