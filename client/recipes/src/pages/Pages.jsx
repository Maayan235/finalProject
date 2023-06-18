import Home from "./Home";
import Cuisine from "./Cuisine";
import Searched from "./Searched";
import Recipe from "./Recipe";
import React from 'react'
import { Route, Routes, BrowserRouter, useLocation } from 'react-router-dom'
import AddRecipe from './AddRecipe'
import Favorites from "./Favorites";
import MyRecipes from "./MyRecipes";


function Pages({userId}) {
  return (
    <Routes>
      <Route path='/' element={<Home userId={userId} />} />
      <Route path='/cuisine/:type' element={<Cuisine userId={userId}/>} />
      <Route path='/searched/:search' element={<Searched userId={userId}/>} />
      <Route path ='/recipe/:name' element={<Recipe userId={userId}/>} />
      <Route path ='/addRecipe' element={<AddRecipe userId={userId} />} />
      <Route path ='/editRecipe/:id' element={<AddRecipe userId={userId} />} />
      <Route path ='/favorites' element={<Favorites userId={userId} />} />
      <Route path ='/myrecipes' element={<MyRecipes userId={userId} />} />
    </Routes>
  );
}

export default Pages;