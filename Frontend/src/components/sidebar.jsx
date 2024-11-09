// src/components/Sidebar.jsx
import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import DashboardIcon from '@mui/icons-material/Dashboard';
import AnalyticsIcon from '@mui/icons-material/Analytics';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import LightbulbIcon from '@mui/icons-material/Lightbulb';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import SavingsIcon from '@mui/icons-material/Savings';
import BookIcon from '@mui/icons-material/Book';
import { getAuth, signOut } from "firebase/auth";
import { signInSuccess } from '../redux/user/userSlice';
import { useDispatch } from 'react-redux';

export default function Sidebar() {
  const navigate = useNavigate();
  const auth = getAuth();
  const dispatch =useDispatch()

  const handleLogout = () => {
    signOut(auth).then(() => {
        dispatch(signInSuccess());
      navigate('/landing');
    }).catch((error) => {
      console.error("Error signing out: ", error);
    });
  };

  return (
    <div className="fixed top-0 left-0 w-1/5 h-full p-4 text-[#333] shadow-xl flex flex-col justify-between bg-gradient-to-b from-[#d7dfe5] to-[#85b3db]">
      <div>
        <div className="flex items-center mb-8">
          <img src="./logo.png" alt="Logo" className="w-48 mr-2" />
        </div>
        <ul>
          <li>
            <NavLink
              to="/profile"
              className={({ isActive }) =>
                `mb-2 flex items-center p-2 rounded-xl transition-colors duration-300 ${
                  isActive ? 'bg-[#2d5776] text-[#ffffff]' : 'hover:bg-[#57819f] hover:text-[#ffffff]'
                }`
              }
            >
              <AccountCircleIcon className="mr-2" />
              Profile
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/analytics"
              className={({ isActive }) =>
                `mb-2 flex items-center p-2 rounded-xl transition-colors duration-300 ${
                  isActive ? 'bg-[#2d5776] text-[#ffffff]' : 'hover:bg-[#57819f] hover:text-[#ffffff]'
                }`
              }
            >
              <AnalyticsIcon className="mr-2" />
              Analytics
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/tipsandsuggestions"
              className={({ isActive }) =>
                `mb-2 flex items-center p-2 rounded-xl transition-colors duration-300 ${
                  isActive ? 'bg-[#2d5776] text-[#ffffff]' : 'hover:bg-[#57819f] hover:text-[#ffffff]'
                }`
              }
            >
              <LightbulbIcon className="mr-2" />
              Tips & Suggestions
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/Food_Management"
              className={({ isActive }) =>
                `mb-2 flex items-center p-2 rounded-xl transition-colors duration-300 ${
                  isActive ? 'bg-[#2d5776] text-[#ffffff]' : 'hover:bg-[#57819f] hover:text-[#ffffff]'
                }`
              }
            >
              <SavingsIcon className="mr-2" />
              Your Food_Management
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/diary"
              className={({ isActive }) =>
                `mb-2 flex items-center p-2 rounded-xl transition-colors duration-300 ${
                  isActive ? 'bg-[#2d5776] text-[#ffffff]' : 'hover:bg-[#57819f] hover:text-[#ffffff]'
                }`
              }
            >
              <BookIcon className="mr-2" />
              Diary
            </NavLink>
          </li>
        </ul>
      </div>
      <div className="mt-4">
        <hr className="my-4" />
        <button
          onClick={handleLogout}
          className="w-full bg-[#2d5776] text-white p-2 rounded-xl hover:opacity-95 transition-colors duration-300"
        >
          Logout
        </button>
      </div>
    </div>
  );
}
