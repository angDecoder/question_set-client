import React from 'react'
import Form from './Form';

function Register() {
    const input = [
        {
            type : 'text',
            placeholder : 'Username'
        },
        {
            type : 'email',
            placeholder : 'Email'
        },
        {
            type : 'password',
            placeholder : 'Password'
        },
        {
            type : 'password',
            placeholder : 'Confirm Password'
        }
    ];
    const extra = {
        text1 : 'Already Registered ?',
        text2 : 'Login Here',
        link : '/login'
    }
  return (
    <Form heading='Register' input={input} extra={extra} />

  )
}

export default Register