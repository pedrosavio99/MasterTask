import React from 'react';
import { Route, Routes } from "react-router-dom";
import FormExample from './components/FormExample';
import Navbar from './components/Navbar';
import './index.css';
import { default as AdminPage } from './pages/AdminPage';
import GmPage from './pages/GmPage';
import LoginPage from './pages/Login';
import RegisterPage from './pages/Register';
import TecnoPage from './pages/TecnicoPage';

const App = () => {
  return (<>
   <Navbar/>
      <Routes>
        <Route path="/"  element={<LoginPage />} />
        <Route path="/admin"  element={<AdminPage />} />
        <Route path="/form"  element={<FormExample />} />
        <Route path="/tecno"  element={<TecnoPage />} />
        <Route path="/gm"  element={<GmPage />} />
        <Route path="/login"  element={<LoginPage />} />
        <Route path="/register"  element={<RegisterPage />} />
      </Routes>
  </>
     
  );
};

export default App;
