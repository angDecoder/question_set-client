import React from 'react';
import ReactDom from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import App from './App';
import Challenges from './component/Challenges/Challenges';
import Login from './component/Form/Login';
import Register from './component/Form/Register';
import Home from './component/Home/Home';
import Sheet from './component/Sheet/Sheet';
import Solution from './component/Solution/Solution';
import { Provider } from 'react-redux';
import store from './app/store';
import ProtectedRoute from './component/ProtectedRoute/ProtectedRoute';


const root = ReactDom.createRoot(document.getElementById('root'));
root.render(
    <Provider store={store} >
        <BrowserRouter>
            <Routes>
                <Route path='/' element={<App />}>
                    <Route path='/' element={<Home />} />
                    <Route path='/login' element={<Login />} />
                    <Route path='/register' element={<Register />} />

                    <Route element={<ProtectedRoute />}>
                        <Route path='/challenges' element={<Challenges />} />
                        <Route path='/sheet/:id' element={<Sheet />} />
                        <Route path='/solution/:id' element={<Solution />} />
                    </Route>


                </Route>
            </Routes>
        </BrowserRouter>
    </Provider>
);
