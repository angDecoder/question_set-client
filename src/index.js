import React from 'react';
import ReactDom from 'react-dom/client';
import { BrowserRouter,Routes,Route } from 'react-router-dom';
import App from './App';
import Home from './component/Home/Home';


const root = ReactDom.createRoot(document.getElementById('root'));
root.render(
    <BrowserRouter>
        <Routes>
            <Route path='/' element={<App/>}>
                <Route path='/' element={<Home />} />
            </Route>
        </Routes>
    </BrowserRouter>
)

