import React from 'react';
import { Outlet,Navigate,useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';

function ProtectedRoute() {
    const loggedIn = useSelector(state=>state.user.loggedIn);
    const location = useLocation();
    if( loggedIn )
        return <Outlet />
    else 
        return <Navigate to={'/login'} state={{ from : location.pathname }} replace />
}

export default ProtectedRoute