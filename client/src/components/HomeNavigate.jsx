import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate, useLocation } from 'react-router-dom';
import label from '../constants/label';

function HomeNavigate() {
    const { user } = useSelector((state) => state.auth);
    const location = useLocation();

    return !user ? (
        <Navigate to="/signin" state={{ from: location }} replace />
    ) : user.Role === label.role.ADMIN ? (
        <Navigate to="/record/manager" state={{ from: location }} replace />
    ) : user.Role === label.role.MANAGER ? (
        <Navigate to="/in-out/parking" state={{ from: location }} replace />
    ) : (
        <Navigate to="/record/manager" state={{ from: location }} replace />
    );
}

export default HomeNavigate;
