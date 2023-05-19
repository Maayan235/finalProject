import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { Link, useParams } from 'react-router-dom';
import RecipeCard from '../components/RecipeCard';
import '../components/Card.css'

function Cuisine() {

    const [cuisine, setCuisine] = useState([]);
    const [recipes, setRecipes] = useState([]);
    const [recipesByType, setRecipesByType] = useState([]);
    let params = useParams();

    const getCuisine = async (name) => {
        const check = localStorage.getItem(`cuisine${name}`);
        if (check) {
            setCuisine(JSON.parse(check));
        } else {
            const data = await fetch(`https://api.spoonacular.com/recipes/complexSearch?apiKey=${process.env.REACT_APP_API_KEY}&cuisine=${name}`)
            const recipes = await data.json();
            
            localStorage.setItem(`cuisine${name}`, JSON.stringify(recipes.results));

            setCuisine(recipes.results);
        }
    };

    
    
    // This method fetches the records from the database.
    useEffect(() => {
        async function getRecipes(type) {
            const response = await fetch(`http://localhost:5000/recipes/cuisine/${type}`);
        
            if (!response.ok) {
                const message = `An error occured: ${response.statusText}`;
                window.alert(message);
                return;
            }
        
            const recipes = await response.json();
            setRecipes(recipes);


        }
        if (params.type) {
            getRecipes(params.type);
        }

    }, [params.type]);




    return (
        <div>
        <h3>{params.type.charAt(0).toUpperCase() + params.type.slice(1)} Food:</h3>
            <div className="card-container">
                {recipes && recipes.map((recipe) => (
                    <div className="card">
                    <RecipeCard recipe = {recipe}/>
                    </div>

                ))}
            </div>
        
        </div>

    )
}



export default Cuisine