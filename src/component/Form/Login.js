import React, { useEffect, useRef } from 'react';
import axios from 'axios';

import Form from './Form';
import useToast from '../../hooks/useToast';

function Login() {
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
        const toast = createToast({ text : 'logging in', type : 'promise-pending' });
        const res = await axios.post('http://localhost:3500/user/login',{
            email,
            password
        });
        toast.update({ text : "logged in", autoClose : 5000,type : 'promise-resolved' });

        // console.log(res);
    }
  return (
    <Form heading='Login' input={input} extra={extra} onSubmitHandler={login} />
  )
}

export default Login