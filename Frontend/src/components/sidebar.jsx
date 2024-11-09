import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import DashboardIcon from '@mui/icons-material/Dashboard';
import AnalyticsIcon from '@mui/icons-material/Analytics';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import LightbulbIcon from '@mui/icons-material/Lightbulb';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import SavingsIcon from '@mui/icons-material/Savings';
import BookIcon from '@mui/icons-material/Book';
import { signOutSuccess } from '../redux/user/userSlice';
import { useDispatch, useSelector } from 'react-redux';
import LogoutIcon from '@mui/icons-material/Logout';

export default function Sidebar() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  
  const handleLogout = () => {
    dispatch(signOutSuccess());
    navigate('/landing');
  };
  
  const entity = useSelector((state) => state.user.currentUser.entity);

  return (
    <div className="fixed top-0 left-0 w-1/5 h-full p-4 text-[#f2f2f2] shadow-xl flex flex-col justify-between bg-gradient-to-b from-[#378972] to-[#378972]">
      <div>
        <div className="flex justify-center mb-4">
          <img src="/logo.png" alt="Logo" className="w-24 mr-2" />
        </div>
        <ul>
         
          
          {entity === 'PROVIDER' && (
            <>
             <li>
            <NavLink
              to="provider/profile"
              className={({ isActive }) =>
                `mb-2 flex items-center p-2 rounded-xl transition-colors duration-300 ${
                  isActive ? 'bg-[#d5f9e2] text-[#000]' : 'hover:bg-[#d5f9e2] hover:text-[#333]'
                }`
              }
            >
              <AccountCircleIcon className="mr-2" />
              Profile
            </NavLink>
          </li>
              <li>
                <NavLink
                  to="provider/analytics"
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
                  to="provider/tipsandsuggestions"
                  className={({ isActive }) =>
                    `mb-2 flex items-center p-2 rounded-xl transition-colors duration-300 ${
                      isActive ? 'bg-[#2d5776] text-[#ffffff]' : 'hover:bg-[#57819f] hover:text-[#ffffff]'
                    }`
                  }
                >
                  <LightbulbIcon className="mr-2" />
                  Inventory
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="provider/Food_Management"
                  className={({ isActive }) =>
                    `mb-2 flex items-center p-2 rounded-xl transition-colors duration-300 ${
                      isActive ? 'bg-[#2d5776] text-[#ffffff]' : 'hover:bg-[#57819f] hover:text-[#ffffff]'
                    }`
                  }
                >
                  <SavingsIcon className="mr-2" />
                  Meal Planning
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="provider/donation-center"
                  className={({ isActive }) =>
                    `mb-2 flex items-center p-2 rounded-xl transition-colors duration-300 ${
                      isActive ? 'bg-[#2d5776] text-[#ffffff]' : 'hover:bg-[#57819f] hover:text-[#ffffff]'
                    }`
                  }
                >
                  <BookIcon className="mr-2" />
                  Support Others
                </NavLink>
              </li>
            </>
          )}

          {entity === 'NGO' && (
            <>
            <li>
            <NavLink
              to="ngo/profile"
              className={({ isActive }) =>
                `mb-2 flex items-center p-2 rounded-xl transition-colors duration-300 ${
                  isActive ? 'bg-[#d5f9e2] text-[#000]' : 'hover:bg-[#d5f9e2] hover:text-[#333]'
                }`
              }
            >
              <AccountCircleIcon className="mr-2" />
              Profile
            </NavLink>
          </li>
              <li>
                <NavLink
                  to="ngo/getMeals"
                  className={({ isActive }) =>
                    `mb-2 flex items-center p-2 rounded-xl transition-colors duration-300 ${
                      isActive ? 'bg-[#2d5776] text-[#ffffff]' : 'hover:bg-[#57819f] hover:text-[#ffffff]'
                    }`
                  }
                >
                  <LightbulbIcon className="mr-2" />
                  Get Meals
                </NavLink>
              </li>
              
            </>
          )}
        </ul>
      </div>
      <div className="mt-4">
        <hr className="my-4" />
        <button
          onClick={handleLogout}
          className="w-full bg-[#d5f9e2] text-slate-900 p-2 rounded-xl hover:opacity-95 transition-colors duration-300"
        > <LogoutIcon/> 
          Logout
        </button>
      </div>
    </div>
  );
}
