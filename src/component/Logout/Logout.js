import React, { useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import { useDispatch,useSelector } from 'react-redux';
import { logoutUser } from '../../features/userSlice';
import useToast from '../../hooks/useToast';

function Logout() {
    const createToast = useToast();
    const dispatch = useDispatch();
    const loggedIn = useSelector(state=>state.user.loggedIn);
    const email = useSelector(state=>state.user.email);
    // useEffect(()=>{
        if( loggedIn ){
            const toast = createToast({ type : 'promise-pending', text : 'signing out' });
            dispatch(logoutUser({ email,toast }));
        }
    // },[])
    return <Navigate to='/' replace />
}

export default Logout