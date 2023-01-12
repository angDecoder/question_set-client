import React, { useEffect } from 'react'

import './Form.css';
import '../../index.css';
import { NavLink } from 'react-router-dom';

function Form({ heading,input,extra,onSubmitHandler }) {

    useEffect(()=>{
        input[0].ref.current.focus();
    })

  return (
    <form  id='form' className='box fancyborder'>
        <h2 className='head2'>{heading}</h2>
        
        {
            input.map(i=>{
                return <input ref={i.ref} className='input' key={i.placeholder} type={i.type} placeholder={i.placeholder} />
            })
        }

        <div id='form__btn'>
            <button onClick={onSubmitHandler} className='btn' color='green'>Submit</button>
            <button className='btn' color='red'>Clear</button>
        </div>
        <p className='para'>
            {extra.text1} <br />
            <NavLink className='span form__link' to={extra.link}>{extra.text2}</NavLink>
        </p>
        
    </form>
  )
}

export default Form