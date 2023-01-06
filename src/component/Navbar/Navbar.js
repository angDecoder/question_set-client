import React from 'react';
import { NavLink } from 'react-router-dom';

import './Navbar.css';
import '../../index.css';
import hamburger from '../../assets/hamburger.svg';
import logo from '../../assets/logo.jpg';
import cross from '../../assets/cross.svg';

function Navbar() {

    const toggleNavbar = ()=>{
        let width = Number(window.innerWidth);
        // console.log(typeof width);
        if( width>480 )
            return;
        
        let nav = document.querySelector('nav');
        let display = nav.style.left;
        // console.log(display);
        if( display==='0px' )
            nav.style.left = '-100%';
        else
            nav.style.left = '0';
    }
    
  return (
    <header className='box'>
        <img src={hamburger} id='head__hamburger' onClick={toggleNavbar} alt="ham" className='svg-img' />
        <nav id='nav' className='glass'>
            <NavLink onClick={toggleNavbar} className={'nav__link'} to='/'>Home</NavLink>
            <NavLink onClick={toggleNavbar} className={'nav__link'} to='/challenges'>Challenges</NavLink>
            <NavLink onClick={toggleNavbar} className={'nav__link'} to='/login'>Login</NavLink>
            <NavLink onClick={toggleNavbar} className={'nav__link'} to='/register'>Register</NavLink>
            <NavLink onClick={toggleNavbar} className={'nav__link'} to='/logout'>Logout</NavLink>
            <img onClick={toggleNavbar} src={cross} alt="close" id='nav__close' className='svg-img' />
        </nav>
        <img src={logo} alt="" id='head__logo' />
        {/* <div></div> */}
    </header>
  )
}

export default Navbar