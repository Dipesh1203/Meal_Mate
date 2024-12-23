import React, { useState } from "react";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";

export default function DonationMeal() {
  const donor_id = useSelector((state) => state.user.currentUser.id);
  const { latitude, longitude, address, entity_name } = useSelector(
    (state) => state.user.currentUser
  );
  console.log(address);

  const [formData, setFormData] = useState({
    donor_id: donor_id,
    meal_description: "",
    quantity: "",
    pickup_location: "",
    latitude: latitude,
    longitude: longitude,
    provider_name: entity_name,
    expiry_date: "",
    pickup_time: "", // Optional, leave blank if not necessary
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(
        `https://beta-8-virid.vercel.app/provider/donation-center/donation-meal`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        }
      );
      console.log(formData);

      const result = await response.json();
      if (response.ok) {
        toast.success("Donation meal created successfully!");
      } else {
        toast.error(`Failed to create donation meal: ${result.error}`);
      }
    } catch (error) {
      console.error(error);
      toast.error("An error occurred while creating the donation meal.");
    }
  };

  return (
    <div className="max-w-lg mx-auto p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-semibold text-center text-gray-700 mb-6">
        Donate a Meal
      </h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="flex flex-col">
          <label className="text-gray-600 font-medium mb-1">
            Meal Description
          </label>
          <textarea
            name="meal_description"
            value={formData.meal_description}
            onChange={handleChange}
            className="border border-gray-300 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
            required
          />
        </div>

        <div className="flex flex-col">
          <label className="text-gray-600 font-medium mb-1">
            Quantity (in servings)
          </label>
          <input
            type="number"
            name="quantity"
            value={formData.quantity}
            onChange={handleChange}
            min="1"
            className="border border-gray-300 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
            required
          />
        </div>

        <div className="flex flex-col">
          <label className="text-gray-600 font-medium mb-1">
            Pickup Location
          </label>
          <input
            type="text"
            name="pickup_location"
            value={formData.pickup_location}
            onChange={handleChange}
            className="border border-gray-300 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
            required
          />
        </div>

        <div className="flex flex-col">
          <label className="text-gray-600 font-medium mb-1">Expiry Date</label>
          <input
            type="datetime-local"
            name="expiry_date"
            value={formData.expiry_date}
            onChange={handleChange}
            className="border border-gray-300 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
            required
          />
        </div>

        <div className="flex flex-col">
          <label className="text-gray-600 font-medium mb-1">Pickup Time</label>
          <input
            type="datetime-local"
            name="pickup_time"
            value={formData.pickup_time}
            onChange={handleChange}
            className="border border-gray-300 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-green-500 text-white py-2 rounded-md hover:bg-green-600 transition duration-200"
        >
          Submit Donation
        </button>
      </form>
    </div>
  );
}
