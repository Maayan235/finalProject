import Pages from "./pages/Pages";
import Search from "./components/Search";
import styled from "styled-components";
import { Link } from "react-router-dom";
import logo2 from './images/logo2.jpg'
import './BasicStructure.css'
import React, { useState } from 'react';
import { FaChevronDown, FaChevronUp } from 'react-icons/fa';




function BasicStructure({ userId, onLogout }) {
  const [showCategories, setShowCategories] = useState(false);

  const toggleCategories = () => {
    setShowCategories(!showCategories);
  };

  return (
    <div className="BasicStructure">
      <div className="nav-wrapper">
        <Nav class="nav">
          <Search/>

          <a onClick ={onLogout} href="/" className="logout-link">Log out</a>
        </Nav>
      </div>

        <div className="sidenav">
        <Link to="/">
        <img src={logo2} alt="AudioChecf" className="logo" />
      </Link>
          <a href="/">Home</a>
          <a href='/favorites'>Favorites</a>
          <a href='/myrecipes'>My Recipes</a>
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
            <Pages userId={userId}/>
          </div>
        </div>


    </div>
  );
}

const Logo = styled(Link)`
  width: 50px;
  height: 40px;
  text-decoration: none;
  font-size: 1rem;
  font-weight: 400;
`

const Nav = styled.div`
  padding: 1.5rem 0rem;
  position: fixed !importants;
  top: 0;
  left: 0;
  width: 100%;
  z-index: 0;
  justify-content: flex-start;
  align-items: center;
  background-color: white;
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.1);
`

export default BasicStructure;
