import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from './component/Navbar/Navbar';

function App() {
  return (
    <>
    <div id='toastify'></div>
      <Navbar />
      <main id='main'>
        <Outlet />
      </main>
    </>
  )
}

export default App