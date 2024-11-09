// provider.controllers.js
const { db } = require("../db/index.js");
const knex = require("../knexfile.js");

exports.divideDonation = async (req, res) => {
  try {
    const { donation_meal_id, quantity } = req.body;

    // Fetch the original donation meal entry
    const result = await db("donation_meal")
      .where({ donation_meal_id })
      .returning("*");

    if (result.length === 0) {
      return res.status(404).json({ message: "Donation meal not found" });
    }

    const { donation_meal_id: id, ...rest } = result[0];

    // Create a new reserved meal entry with is_reserved set to true and the specified quantity
    const newReserve = { ...rest, is_reserved: true, quantity };

    // Calculate the remaining quantity
    const finalQuantity = Math.max(0, result[0].quantity - quantity);

    // Create the remaining meal entry if any quantity is left, and set is_reserved to false
    const newRem = { ...rest, quantity: finalQuantity, is_reserved: false };

    // Insert the reserved meal entry
    const reserveData = await db("donation_meal")
      .insert(newReserve)
      .returning("*");

    // Insert the remaining meal entry only if finalQuantity > 0
    let remData = [];
    if (finalQuantity > 0) {
      remData = await db("donation_meal").insert(newRem).returning("*");
    }

    // Delete the original donation meal entry
    await db("donation_meal").where({ donation_meal_id }).del();

    // Respond with the reserved and remaining meal data
    res.status(200).json({
      message: "Donation claim status updated successfully",
      donation_meal_reserved: reserveData,
      donation_meal_rem: remData,
    });
  } catch (error) {
    console.error("Error updating donation claim status:", error);
    res.status(500).json({ message: "Server error" });
  }
};
exports.updateDonationClaimStatus = async (req, res) => {
  try {
    const { donation_meal_id } = req.body;

    res.status(200).json({
      message: "Donation claim status updated successfully",
      donation_meal_reserved: reserveData,
      donation_meal_rem: remData,
    });
  } catch (error) {
    console.error("Error updating donation claim status:", error);
    res.status(500).json({ message: "Server error" });
  }
};
