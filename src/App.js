import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from './component/Navbar/Navbar';
import Toast from './component/Toast/Toast';

// import './index.css';

function App() {
  return (
    <>
    <Toast />
      <Navbar />
      <main id='main'>
        <Outlet />
      </main>
    </>
  )
}

export default App