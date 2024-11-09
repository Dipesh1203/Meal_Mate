import React from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useSelector } from 'react-redux';
import Analytics from './pages/Analytics';
import Profile from './pages/Profile';
import TipsAndSuggestions from './pages/TipsAndSuggestions';
import Food_Management from './pages/Food_Management';
import Test from './pages/Test';
import PrivateRoute from './components/PrivateRoute';
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import DividedLogin from './pages/DividedLogin';
import GetMeals from './pages/GetMeals';
import { ProtectedRoute } from './components/ProtectedRoute';
import Landing from './pages/Landing';
import DonationCenter from './pages/DonationCenter';

export default function App() {
  const currentUser = useSelector((state) => state.user.currentUser);

  const entityType = currentUser?.entity;

  return (
    <BrowserRouter>
      <Routes>
        {/* Public routes */}
        <Route path='/landing' element={<ProtectedRoute> <Landing/></ProtectedRoute>}/>
        <Route path='/login' element={<ProtectedRoute> <DividedLogin/></ProtectedRoute>}/>

        {/* Conditional routes based on entity type */}
        {entityType === 'PROVIDER' && (
          <Route element={<PrivateRoute allowedEntities={['PROVIDER']} />}>
            <Route path='/analytics' element={<Analytics/>}/>
            <Route path='/profile' element={<Profile/>}/>
            <Route path='/tipsandsuggestions' element={<TipsAndSuggestions/>}/>
            <Route path='/Food_Management' element={<Food_Management/>}/>
            <Route path='/' element={<Test/>}/>
            <Route path='/donation-center' element={<DonationCenter/>}/>
          </Route>
        )}

        {entityType === 'NGO' && (
          <Route element={<PrivateRoute allowedEntities={['NGO']} />}>
            <Route path='/getMeals' element={<GetMeals/>}/>
          </Route>
        )}
        
      </Routes>
      <ToastContainer />
    </BrowserRouter>
  );
}
