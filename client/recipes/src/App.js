import Pages from "./pages/Pages";
import { BrowserRouter } from 'react-router-dom';
import Category from "./components/Category";
import Search from "./components/Search";
import styled from "styled-components";
import {GiKnifeFork} from "react-icons/gi";
import { Link } from "react-router-dom";
import img from './images/header4.jpg'
import logo from './images/logo.jpg'
import './App.css'
import React, { useState } from 'react';
import { FaChevronDown, FaChevronUp } from 'react-icons/fa';


function App() {

  const [showCategories, setShowCategories] = useState(false);

  const toggleCategories = () => {
    setShowCategories(!showCategories);
  };

  return (
    <div className="App">
      <BrowserRouter>
      <div className="nav-wrapper">
        <Nav class="nav">
          <Link to="/">
            <img src={logo} alt="AudioChecf" className="logo" />
          </Link>
        </Nav>
      </div>

        <div className="sidenav">
          <a href="/">Home</a>
          <a href="#about">Favorites</a>
          <a href="#clients" onClick={toggleCategories}>
             {showCategories ? <FaChevronUp /> : <FaChevronDown />} All Recipes
            {showCategories ? (
              <ul className="nested-list">
                <li><a href='/cuisine/Italian'>Italian</a></li>
                <li><a href='/cuisine/American'>American</a></li>
                <li><a href='/cuisine/Thai'>Thai</a></li>
                <li><a href='/cuisine/Japanese'>Japanese</a></li>
              </ul>
            ) : null}
          </a>
          <a href="#contact">Add new Recipe</a>
        </div>
        
        <div className="main-wrapper">
          <div class="main">
            <Pages />
          </div>
        </div>

      </BrowserRouter>

    </div>
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
