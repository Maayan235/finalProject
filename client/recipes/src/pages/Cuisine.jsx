import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { Link, useParams } from 'react-router-dom';
import RecipeCard from '../components/RecipeCard';
import '../components/Card.css'

function Cuisine() {

    const [cuisine, setCuisine] = useState([]);
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

    useEffect(() => {
        getCuisine(params.type);

    }, [params.type]);
    return (
        <div>
            <h3>{params.type} Food:</h3>
            <div className="card-container">
                {cuisine.map((recipe) => (
                    <div className="card">
                    <RecipeCard recipe = {recipe}/>
                    </div>

                ))}
            </div>
        
        </div>

    )

    
}



export default Cuisine