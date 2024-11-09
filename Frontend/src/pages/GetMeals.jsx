import React, { useEffect, useState } from "react";
import axios from "axios";

const DonationsList = () => {
  const [donations, setDonations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Fetch the donations data from the API
    const fetchDonations = async () => {
      try {
        const response = await axios.get(
          "http://localhost:3000/provider_list/get/donation-meal/all"
        );
        setDonations(response.data);
        setLoading(false);
      } catch (err) {
        setError("Error fetching donations");
        setLoading(false);
      }
    };

    fetchDonations();
  }, []);

  if (loading) return <p>Loading donations...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div>
      <h1>All Donations</h1>
      {donations.length > 0 ? (
        <ul>
          {donations.map((donation) => (
            <li key={donation.donation_meal_id}>
              <p>
                <strong>ID:</strong> {donation.donation_meal_id}
              </p>
              <p>
                <strong>Donor ID:</strong> {donation.donor_id}
              </p>
              <p>
                <strong>Meal Description:</strong> {donation.meal_description}
              </p>
              <p>
                <strong>Quantity:</strong> {donation.quantity}
              </p>
              <p>
                <strong>Pickup Location:</strong> {donation.pickup_location}
              </p>
              <p>
                <strong>Latitude:</strong> {donation.latitude || "N/A"}
              </p>
              <p>
                <strong>Longitude:</strong> {donation.longitude || "N/A"}
              </p>
              <p>
                <strong>Expiry Date:</strong>{" "}
                {new Date(donation.expiry_date).toLocaleString()}
              </p>
              <p>
                <strong>Pickup Time:</strong>{" "}
                {new Date(donation.pickup_time).toLocaleString()}
              </p>
              <p>
                <strong>Claimed:</strong> {donation.is_claimed ? "Yes" : "No"}
              </p>
              <p>
                <strong>Claimed By:</strong> {donation.claimed_by || "N/A"}
              </p>
              <p>
                <strong>Created At:</strong>{" "}
                {new Date(donation.created_at).toLocaleString()}
              </p>
              <p>
                <strong>Updated At:</strong>{" "}
                {new Date(donation.updated_at).toLocaleString()}
              </p>
              <hr />
            </li>
          ))}
        </ul>
      ) : (
        <p>No donations available</p>
      )}
    </div>
  );
};

export default DonationsList;
