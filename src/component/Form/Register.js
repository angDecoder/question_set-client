import React, { useRef } from 'react'
import Form from './Form';
import useToast from '../../hooks/useToast';
import axios from 'axios';

function Register() {
    const input = [
        {
            type : 'text',
            placeholder : 'Username',
            ref : useRef()
        },
        {
            type : 'email',
            placeholder : 'Email',
            ref : useRef(),
        },
        {
            type : 'password',
            placeholder : 'Password',
            ref : useRef()
        },
        {
            type : 'password',
            placeholder : 'Confirm Password',
            ref : useRef()
        }
    ];
    const extra = {
        text1 : 'Already Registered ?',
        text2 : 'Login Here',
        link : '/login'
    }

    const createToast = useToast();

    const register = (event)=>{
        event.preventDefault();
        // console.log('here');
        const [username,email,password,cnfPassword] = input.map(elem=>{
            return elem.ref.current.value.trim();
        })
        const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        if( !emailRegex.test(email) ){
            createToast({ text : 'email not valid' });
            return;
        }
        if( cnfPassword!==password ){
            createToast({ text : 'confirm password did not match password' });
            return;
        }

        const toast = createToast({ text : 'registering user', type : 'promise-pending' });
        try {
            const res = axios.post('http://localhost:3500/user/register',{
                username,
                password,
                email
            });
            toast.update({ text : 'user registered', type : 'promise-resolved' });
            
        } catch (error) {
            toast.update({ type : 'promise-rejected', text : 'could not register user' });
            console.log(error);
        }
        
    }
  return (
    <Form heading='Register' input={input} extra={extra} onSubmitHandler={register} />

  )
}

export default Register