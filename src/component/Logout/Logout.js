import React, { useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import { useDispatch,useSelector } from 'react-redux';
import { logoutUser } from '../../features/userSlice';

function Logout() {
    const dispatch = useDispatch();
    const loggedIn = useSelector(state=>state.user.loggedIn);
    const email = useSelector(state=>state.user.email);
    useEffect(()=>{
        if( loggedIn )
            dispatch(logoutUser({ email }));
    },[])
    return <Navigate to='/' replace />
}

export default Logout