// src/components/PrivateLayout.jsx
import React from 'react';
import Sidebar from './Sidebar';
import { Outlet } from 'react-router-dom';

const PrivateLayout = () => {
  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <div className="flex-1 p-4 ml-[20%] overflow-y-auto">
        <Outlet />
      </div>
    </div>
  );
};

export default PrivateLayout;
