import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from './component/Navbar/Navbar';

import './index.css';

function App() {
  return (
    <>
      <Navbar />
      <main id='main'>
        <Outlet />
      </main>
    </>
  )
}

export default App