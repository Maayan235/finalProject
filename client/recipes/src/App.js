import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Login from "./components/Login";
import styled from "styled-components";
import img from './images/header4.jpg'
import './App.css'
import React, { useState,  useEffect } from 'react';
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
  );
}  


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
