import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate, Outlet } from 'react-router-dom';
import PrivateLayout from './PrivateLayout';

export default function PrivateRoute({ allowedEntities }) {
    const { currentUser } = useSelector((state) => state.user);

    if (!currentUser) {
        return <Navigate to="/landing" />;
    } else if (allowedEntities && !allowedEntities.includes(currentUser.entity)) {
       
        return <Navigate to="/landing" />;
    }
    return (
        <PrivateLayout>
            <Outlet />
        </PrivateLayout>
    );
}
