const express = require("express");
const router = express.Router();
const providerController = require("../controllers/provider.controllers.js");

router
  .route("/donation-center/donation-meal")
  .post(providerController.createDonationMeal);

module.exports = router;
