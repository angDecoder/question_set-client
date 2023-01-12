import React, { useRef } from 'react'
import Form from './Form';

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

    const register = ()=>{
        const [username,email,password,cnfPassword] = input.map(elem=>{
            return elem.ref.current.value.trim();
        })

        
    }
  return (
    <Form heading='Register' input={input} extra={extra} onSubmitHandler={register} />

  )
}

export default Register