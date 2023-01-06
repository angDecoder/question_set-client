import React from 'react'

import Form from './Form';

function Login() {
    const input = [
        {
            type : 'text',
            placeholder : 'Username'
        },
        {
            type : 'password',
            placeholder : 'Password'
        }
    ];
    const extra = {
        text1 : 'Not Registered ?',
        text2 : 'Register Here',
        link : '/register'
    }
  return (
    <Form heading='Login' input={input} extra={extra} />
  )
}

export default Login