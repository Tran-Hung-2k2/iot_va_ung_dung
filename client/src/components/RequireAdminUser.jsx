import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate, Outlet, useLocation } from 'react-router-dom';

import label from '../constants/label';

function RequireAdminUser() {
    const { user } = useSelector((state) => state.auth);
    const location = useLocation();

    return user && [label.role.USER, label.role.ADMIN].includes(user.Role) ? (
        <Outlet />
    ) : (
        <Navigate to="/signin" state={{ from: location }} replace />
    );
}

export default RequireAdminUser;
