import Pages from "./pages/Pages";
import { BrowserRouter } from 'react-router-dom';
import Category from "./components/Category";
import Search from "./components/Search";
import Login from "./components/Login";
import Register from "./components/Register";

import styled from "styled-components";
import {GiKnifeFork} from "react-icons/gi";
import { Link } from "react-router-dom";
import img from './images/header4.jpg'
import logo from './images/logo.jpg'
import './BasicStructure.css'
import React, { useState } from 'react';
import { FaChevronDown, FaChevronUp } from 'react-icons/fa';


function BasicStructure() {

  const [showCategories, setShowCategories] = useState(false);

  const toggleCategories = () => {
    setShowCategories(!showCategories);
  };

  return (
    <div className="BasicStructure">
      
      <div className="nav-wrapper">
        <Nav class="nav">
          <Link to="/">
            <img src={logo} alt="AudioChecf" className="logo" />
          </Link>
        </Nav>
      </div>

        <div className="sidenav">
          <a href="/">Home</a>
          <a href='/favorites'>Favorites</a>
          <a href="#categories" onClick={toggleCategories}>
             {showCategories ? <FaChevronUp /> : <FaChevronDown />} All Recipes
            {showCategories ? (
              <ul className="nested-list">
                <li><a href='/cuisine/italian'>Italian</a></li>
                <li><a href='/cuisine/american'>American</a></li>
                <li><a href='/cuisine/thai'>Thai</a></li>
                <li><a href='/cuisine/japanese'>Japanese</a></li>
              </ul>
            ) : null}
          </a>
          <a href='/addRecipe'>Add new Recipe</a>
        </div>
        
        <div className="main-wrapper">
          <div class="main">
            <Pages />
          </div>
        </div>


    </div>
  );

  {/*return(
    <div>
    {
      //<Login/>
    }
    {
      <Register/>
    }
    </div>
  );*/}

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

export default BasicStructure;
