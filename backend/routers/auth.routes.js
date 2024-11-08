const express = require("express");
const router = express.Router();
const userController = require("../controllers/auth.controllers.js");

router.route("/signup").post(userController.signup);

router.route("/login").post(userController.login);

router.get("/logout", userController.logout);

module.exports = router;
