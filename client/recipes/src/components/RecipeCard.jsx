import React from "react";
import './Card.css'
import { Link } from "react-router-dom";

function RecipeCard({ recipe }) {
  return (
    <div >
        <Link to={'/recipe/'+recipe._id} >
            <img src={recipe.image} alt={recipe.title} />
            <h3>{recipe.title}</h3>
        </Link>
    </div>
  );
}

export default RecipeCard;