import React from 'react'

import './Form.css';
// import '../../index.css';
import { NavLink } from 'react-router-dom';

function Form({ heading,input,extra }) {
  return (
    <form id='form' className='box fancyborder'>
        <h2 className='head2'>{heading}</h2>
        
        {
            input.map(i=>{
                return <input className='input para' key={i.placeholder} type={i.type} placeholder={i.placeholder} />
            })
        }

        <div id='form__btn'>
            <button className='btn' color='green'>Submit</button>
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