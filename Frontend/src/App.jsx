import React from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Landing from './pages/landing';
import Analytics from './pages/Analytics';
import Profile from './pages/Profile';
import TipsAndSuggestions from './pages/TipsAndSuggestions';
import Food_Management from './pages/Food_Management';
import Diary from './pages/Diary';
import Test from './pages/Test';
import PrivateRoute from './components/PrivateRoute';
import { ProtectedRoute } from './components/ProtectedRoute';
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/landing' element={<ProtectedRoute> <Landing/></ProtectedRoute>}/>

        <Route element={<PrivateRoute />}>

        <Route path='/analytics' element={<Analytics/>}/>
        <Route path='/profile' element={<Profile/>}/>
        <Route path='/tipsandsuggestions' element={<TipsAndSuggestions/>}/>
        <Route path='/Food_Management' element={<Food_Management/>}/>
        <Route path='/diary' element={<Diary/>}/>
        <Route path='/' element={<Test/>}/>

        </Route>


      </Routes>
      <ToastContainer />
    </BrowserRouter>
  )
}
