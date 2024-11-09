import React from 'react'
import { useSelector } from 'react-redux';
import { Navigate, Outlet } from 'react-router-dom';
import PrivateLayout from './PrivateLayout';

export default function PrivateRoute() {
    const {currentUser} = useSelector((state) => state.user);

  return (
    currentUser? <PrivateLayout /> : <Navigate to="/landing"/>
  )
}
