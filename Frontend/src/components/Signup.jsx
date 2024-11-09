import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { signInFailure, signInStart, signInSuccess } from "../redux/user/userSlice";
import CircularProgress from "@mui/material/CircularProgress";
import { toast } from "react-toastify";

export default function Signup() {
  const [formData, setFormData] = useState({});
  const [err, setErr] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading } = useSelector((state) => state.user);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { email, phone, entity_name, address, latitude, longitude, legal_identity, entity, password } = formData;


    if (email && phone && entity_name && address && latitude && longitude && legal_identity && entity && password) {
      dispatch(signInStart());
      try {
        const response = await axios.post("http://localhost:5000/auth/signup", formData);

        if (response.status === 201) {
          dispatch(signInSuccess(formData));
          toast.success("You are successfully signed up");
          navigate("/analytics");
        }
      } catch (error) {
        setErr(error.response?.data?.error || "Server error");
        dispatch(signInFailure(error.message));
      }
    } else {
      setErr("Please fill in all required fields");
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    if (err) {
      setErr("");
    }
  };

  return (
    <div className="bg-slate-50 text-slate-700 p-6 rounded-lg shadow-lg w-full max-w-2xl mx-auto">
      <h2 className="text-3xl font-bold mb-4">Sign Up</h2>
      <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-gray-700">Email</label>
          <input
            type="email"
            name="email"
            placeholder="Email"
            className="w-full p-2 border rounded"
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label className="block text-gray-700">Phone</label>
          <input
            type="text"
            name="phone"
            placeholder="Phone"
            className="w-full p-2 border rounded"
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label className="block text-gray-700">Entity Name</label>
          <input
            type="text"
            name="entity_name"
            placeholder="Entity Name"
            className="w-full p-2 border rounded"
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label className="block text-gray-700">Address</label>
          <input
            type="text"
            name="address"
            placeholder="Address"
            className="w-full p-2 border rounded"
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label className="block text-gray-700">Latitude</label>
          <input
            type="text"
            name="latitude"
            placeholder="Latitude"
            className="w-full p-2 border rounded"
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label className="block text-gray-700">Longitude</label>
          <input
            type="text"
            name="longitude"
            placeholder="Longitude"
            className="w-full p-2 border rounded"
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label className="block text-gray-700">Legal Identity</label>
          <input
            type="text"
            name="legal_identity"
            placeholder="Legal Identity"
            className="w-full p-2 border rounded"
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label className="block text-gray-700">Entity Type</label>
          <select
            name="entity"
            className="w-full p-2 border rounded"
            onChange={handleChange}
            required
          >
            <option value="">Select Entity</option>
            <option value="NGO">NGO</option>
            <option value="PROVIDER">Provider</option>
          </select>
        </div>
        <div className="col-span-full">
          <label className="block text-gray-700">Password</label>
          <input
            type="password"
            name="password"
            placeholder="Password"
            className="w-full p-2 border rounded"
            onChange={handleChange}
            required
          />
        </div>
        <div className="col-span-full text-red-500 text-sm">{err}</div>
        <button
          type="submit"
          className="col-span-full w-full bg-green-500 text-white p-2 rounded hover:bg-green-600 transition"
          disabled={loading}
        >
          {loading ? <CircularProgress size={24} color="inherit" /> : "Sign Up"}
        </button>
      </form>
    </div>
  );
}
