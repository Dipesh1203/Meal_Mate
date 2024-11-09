// provider.controllers.js
const { db } = require("../db/index.js");
const knex = require("../knexfile.js"); // Ensure knex configuration is imported

// Function to update donation claim status
exports.updateDonationClaimStatus = async (req, res) => {
  const { donation_meal_id } = req.params;

  try {
    const result = await db("donation_meal")
      .where({ donation_meal_id })
      .update({
        is_claimed: true,
        updated_at: knex.fn.now(),
      })
      .returning("*");

    if (result.length === 0) {
      return res.status(404).json({ message: "Donation meal not found" });
    }

    const updatedMeal = result[0];
    res.status(200).json({
      message: "Donation claim status updated successfully",
      donation_meal: updatedMeal,
    });
  } catch (error) {
    console.error("Error updating donation claim status:", error);
    res.status(500).json({ message: "Server error" });
  }
};
