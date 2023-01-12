import React, { useEffect, useRef } from 'react';
import axios from 'axios';
import { useDispatch } from 'react-redux';

import Form from './Form';
import useToast from '../../hooks/useToast';
import { loginUser } from '../../features/userSlice';

function Login() {
    const dispatch = useDispatch();
    const input = [
        {
            type : 'email',
            placeholder : 'Email',
            ref : useRef()
        },
        {
            type : 'password',
            placeholder : 'Password',
            ref : useRef()
        }
    ];
    const extra = {
        text1 : 'Not Registered ?',
        text2 : 'Register Here',
        link : '/register'
    }
    const createToast = useToast();

    const login = async (event)=>{
        event.preventDefault();
        const [email,password] = input.map((elem)=>{
            return elem.ref.current.value.trim();
        });
        const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        if( !emailRegex.test(email) ){
            createToast({ text : 'email not valid' });
            return;
        }

        dispatch(loginUser({email,password}));
    }
  return (
    <Form heading='Login' input={input} extra={extra} onSubmitHandler={login} />
  )
}

export default Login