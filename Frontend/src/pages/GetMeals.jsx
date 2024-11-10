import React, { useEffect, useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import FmdGoodIcon from "@mui/icons-material/FmdGood";
import CircularProgress from "@mui/material/CircularProgress";

import { toast } from "react-toastify";
import CloseIcon from '@mui/icons-material/Close';
import MapComponent from "../components/map";

const DonationsList = () => {
  const [donations, setDonations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [reservedQuantities, setReservedQuantities] = useState({});
  const [isMapOpen, setIsMapOpen] = useState(false);
  const [selectedLocation, setSelectedLocation] = useState({ latitude: null, longitude: null });

  useEffect(() => {
    const fetchDonations = async () => {
      try {
        const response = await axios.get("http://localhost:5000/provider_list/get/donation-meal/all");
        setDonations(response.data);
        setLoading(false);
      } catch (err) {
        setError("Error fetching donations");
        setLoading(false);
      }
    };
    fetchDonations();
  }, []);

  const handleQuantityChange = (donationId, value) => {
    setReservedQuantities((prev) => ({
      ...prev,
      [donationId]: value,
    }));
  };

  const handleReserveMeal = async (donationId) => {
    const quantity = reservedQuantities[donationId];
    if (quantity && quantity > 0) {
      try {
        const response = await fetch("http://localhost:5000/reciver/donation-center/reserve_meal", {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ donation_meal_id: donationId, quantity: quantity }),
        });
        const data = await response.json();
        if (response.ok) {
          toast.success(`Meal reserved: ${quantity} meals from Donation ID: ${donationId}`);
        } else {
          toast.error(data.message || "Failed to reserve meal. Please try again.");
        }
      } catch (error) {
        console.error("Error reserving meal:", error);
        toast.error("An error occurred. Please try again later.");
      }
    } else {
      toast.error("Please enter a valid quantity");
    }
  };

  const handleMapClick = (latitude, longitude) => {
    setSelectedLocation({ latitude, longitude });
    setIsMapOpen(true);
  };

  const closeMap = () => {
    setIsMapOpen(false);
    setSelectedLocation({ latitude: null, longitude: null });
  };

  return (
    <div className="p-4 sm:p-8">
      <h1 className="text-3xl font-bold text-center text-teal-600 mb-8">All Donations</h1>
      {loading ? (
        <div className="flex justify-center items-center">
          <CircularProgress />
        </div>
      ) : donations.length > 0 ? (
        <motion.table
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="w-full bg-white border border-gray-300 rounded-lg shadow-lg overflow-hidden"
        >
          <thead className="bg-teal-500 text-white">
            <tr>
              <th className="px-4 py-2 text-left">ID</th>
              <th className="px-4 py-2 text-left">Entity Name</th>
              <th className="px-4 py-2 text-left">Meal Description</th>
              <th className="px-4 py-2 text-left">Quantity</th>
              <th className="px-4 py-2 text-left">Reserve Meal</th>
              <th className="px-4 py-2 text-left">Location</th>
            </tr>
          </thead>
          <tbody>
            {donations.map((donation) => (
              <tr key={donation.donation_meal_id} className="border-t hover:bg-teal-100">
                <td className="px-4 py-2 text-gray-700">{donation.donation_meal_id}</td>
                <td className="px-4 py-2 text-gray-700">{donation.provider_name}</td>
                <td className="px-4 py-2 text-gray-700">{donation.meal_description}</td>
                <td className="px-4 py-2 text-gray-700">{donation.quantity}</td>
                <td className="px-4 py-2 flex items-center gap-2">
                  <input
                    type="number"
                    value={reservedQuantities[donation.donation_meal_id] || ""}
                    onChange={(e) => handleQuantityChange(donation.donation_meal_id, e.target.value)}
                    className="border border-teal-300 px-3 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 w-20 sm:w-24"
                    placeholder="Qty"
                  />
                  <button
                    onClick={() => handleReserveMeal(donation.donation_meal_id)}
                    className="px-4 py-2 bg-teal-500 text-white font-bold rounded-lg hover:bg-teal-600"
                  >
                    Reserve
                  </button>
                </td>
                <td className="px-4 py-2 text-center">
                  <FmdGoodIcon
                    className="text-teal-500 cursor-pointer"
                    onClick={() => handleMapClick(donation.latitude, donation.longitude)}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </motion.table>
      ) : (
        <p className="text-center text-gray-600">No donations available</p>
      )}

      {isMapOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-8 rounded-lg shadow-lg relative max-w-full sm:max-w-md w-full">
            <button onClick={closeMap} className="absolute top-2 right-2 text-gray-600 hover:text-gray-800">
              <CloseIcon />
            </button>
            <MapComponent latitude={selectedLocation.latitude} longitude={selectedLocation.longitude} />
          </div>
        </div>
      )}
    </div>
  );
};

export default DonationsList;
