import Home from "./Home";
import Category from "../components/Category";
import Cuisine from "./Cuisine";
import Searched from "./Searched";
import Recipe from "./Recipe";
import React from 'react'
import { Route, Routes, BrowserRouter, useLocation } from 'react-router-dom'
import Popular from "../components/Popular";


function Pages() {
  return (

    <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/cuisine/:type' element={<Cuisine />} />
        <Route path='/searched/:search' element={<Searched />} />
        <Route path ='/recipe/:name' element={<Recipe />} />
    </Routes>
  );
}

export default Pages;