const { db } = require("../db/index.js");

module.exports.getDonationMeal = async (req, res) => {
  try {
    const { donor_id, is_claimed } = req.query;
    let query = db("donation_meal").select("*");
    if (donor_id) {
      query = query.where("donor_id", donor_id);
    }
    if (is_claimed) {
      query = query.where("is_claimed", is_claimed);
    }
    const donationMeals = await query;
    res.status(200).json(donationMeals);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error fetching donation meals" });
  }
};
