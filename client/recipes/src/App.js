import Pages from "./pages/Pages";
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Category from "./components/Category";
import Search from "./components/Search";
import Login from "./components/Login";
import Register from "./components/Register";

import styled from "styled-components";
import {GiKnifeFork} from "react-icons/gi";
import { Link } from "react-router-dom";
import img from './images/header4.jpg'
import logo from './images/logo.jpg'
import './App.css'
import React, { useState,  useEffect } from 'react';
import { FaChevronDown, FaChevronUp } from 'react-icons/fa';
import BasicStructure from "./BasicStructure";


function App() {

  const [userId, setUserId] = useState(null);
  const [showCategories, setShowCategories] = useState(false);

  const toggleCategories = () => {
    setShowCategories(!showCategories);
  };

  useEffect(() => {
    const storedUserId = localStorage.getItem("userId");
    if (storedUserId) {
      setUserId(storedUserId);
    }
  }, []);

  const handleLogin = (userId) => {
    setUserId(userId);
    localStorage.setItem("userId", userId);
  };

  const handleLogout = () => {
    setUserId(null);
    localStorage.removeItem("userId");
  };

  return (

    <div>
    <BrowserRouter>
      {userId ? (
        <BasicStructure userId={userId} onLogout={handleLogout}/>
      ) : (
        <Login onLogin={handleLogin} />
      )}
    </BrowserRouter>
    </div>
    // <BrowserRouter>
    //   <Routes>
    //     <Route path="/" element={userId ? <BasicStructure userId={userId} onLogout={handleLogout}/> : <Login onLogin={handleLogin} />} />
    //     <Route path="/register" element={<Register />} />
    //   </Routes>
    // </BrowserRouter>
  );
}  

const Logo = styled(Link)`
  width: 20px;
  height: 20px;
  text-decoration: none;
  font-size: 1rem;
  font-weight: 400;
  font-family: 'Lobster Two', cursive;
`

const Nav = styled.div`
  padding: 1rem 0rem;
  position: fixed !important;
  top: 0;
  left: 0;
  width: 100%;
  z-index: 9999;
  justify-content: flex-start;
  align-items: center;
  background-color: #cccccc;
  background-image: url(${img});
`

export default App;
