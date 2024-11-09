const express = require("express");
const router = express.Router();
const providerController = require("../controllers/get.controllers.js");

router
  .route("/get/donation-meal/all")
  .post(providerController.getAllDonations);
router
  .route("/get/donation-meal")
  .post(providerController.getDonationMeal);

module.exports = router;
