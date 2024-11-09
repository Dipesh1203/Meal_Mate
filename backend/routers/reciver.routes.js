const express = require("express");
const router = express.Router();
const providerController = require("../controllers/reciver.controllers");

router
  .route("/donation-center/reserve_meal")
  .put(providerController.divideDonation);
router
  .route("/donation-center/verify")
  .put(providerController.updateDonationClaimStatus);

module.exports = router;
