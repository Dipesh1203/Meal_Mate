const { db } = require("../db/index.js");

module.exports.createDonationMeal = async (req, res) => {
  const {
    donor_id,
    meal_description,
    quantity,
    pickup_location,
    latitude,
    longitude,
    expiry_date,
    pickup_time,
    is_claimed,
    claimed_by,
  } = req.body;

  // Validate required fields
  if (
    !donor_id ||
    !meal_description ||
    !quantity ||
    !pickup_location ||
    !expiry_date
  ) {
    return res.status(400).json({ error: "Required fields are missing" });
  }

  try {
    // Insert the new donation meal into the database
    const [newMealId] = await db("donation_meal")
      .insert({
        meal_description,
        quantity,
        pickup_location,
        latitude,
        longitude,
        expiry_date,
        pickup_time: pickup_time || knex.fn.now(), // Default to current time if not provided
        is_claimed: is_claimed || false,
        claimed_by: claimed_by || null,
      });
      console.log(newMealId);
      
    res.status(201).json({
      message: "Donation meal created successfully",
      donation_meal_id: newMealId,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to create donation meal" });
  }
};
