// DividedLogin.js
import React, { useState } from 'react';
import Backdrop from "@mui/material/Backdrop";
import Login from './../components/Login';

export default function DividedLogin() {
  const [loginOpen, setLoginOpen] = useState(false);
  const [role, setRole] = useState(null); // Track the role type

  const handleLoginClose = () => setLoginOpen(false);

  const handleLoginOpen = (selectedRole) => {
    setRole(selectedRole); // Set role as NGO or Provider
    setLoginOpen(true);
  };

  return (
    <div className="font-sans h-screen overflow-hidden p-8 flex flex-col justify-center items-center">
      <nav className="flex justify-center items-center w-full max-w-5xl mb-4">
        <img src="./logo.png" alt="Platform Logo" className="w-52 h-auto mr-4" />
      </nav>
      <div className="flex justify-center items-center w-full max-w-5xl">
        <div className="w-1/2 p-8 text-center bg-green-50 border-r border-gray-200">
          <h2 className="text-3xl font-bold text-green-700">For Providers</h2>
          <p className="mt-4 text-gray-600">Help reduce waste by sharing surplus food with those in need.</p>
          <button onClick={() => handleLoginOpen("PROVIDER")} className="mt-4 px-6 py-3 bg-green-500 text-white font-bold rounded-lg">
            Login as Provider
          </button>
        </div>
        <div className="w-1/2 p-8 text-center bg-white">
          <h2 className="text-3xl font-bold text-green-700">For NGOs</h2>
          <p className="mt-4 text-gray-600">Receive food donations from providers in your area.</p>
          <button onClick={() => handleLoginOpen("NGO")} className="mt-4 px-6 py-3 bg-green-500 text-white font-bold rounded-lg">
            Login as NGO
          </button>
        </div>
      </div>
      <Backdrop open={loginOpen} onClick={handleLoginClose}>
        <div onClick={(e) => e.stopPropagation()}>
          <Login role={role} />
        </div>
      </Backdrop>
    </div>
  );
}
