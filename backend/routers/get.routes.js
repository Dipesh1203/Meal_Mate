const express = require("express");
const router = express.Router();
const providerController = require("../controllers/get.controllers.js");

router.route("/get/donation-meal/all").get(providerController.getAllDonations);
router.route("/get/donation-meal").get(providerController.getDonationMeal);

module.exports = router;
