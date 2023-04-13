import React from 'react'
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import RecipeCard from '../components/RecipeCard';
import '../components/Card.css'

function Searched() {

    const [searchedRecipes, setSearchRecipes] = useState([]);
    let params = useParams();

    // const getSearched = async (name) => {
    //     const data = await fetch(`https://api.spoonacular.com/recipes/complexSearch?apiKey=${process.env.REACT_APP_API_KEY}&query=${name}`)
    //     const recipes = await data.json();
    //     setSearchRecipes(recipes.results);

    // };

    // useEffect(() => {
    //     getSearched(params.search);
    // }, [params.search]);


    // This method fetches the records from the database.
    useEffect(() => {
        async function getSearchedRecipes(search) {
            const response = await fetch(`http://localhost:5000/recipes/searched/${search}`);
        
            if (!response.ok) {
                const message = `An error occured: ${response.statusText}`;
                window.alert(message);
                return;
            }
        
            const recipes = await response.json();
            setSearchRecipes(recipes);


        }
        if (params.search) {
            getSearchedRecipes(params.search);
        }

    }, [params.search]);

  return (

    <div>
        <div className="card-container">
            {searchedRecipes && searchedRecipes.length > 0 ? (
                searchedRecipes.map((recipe) => (
                <div className="card">
                <RecipeCard recipe={recipe} />
                </div>
             ))
) : (
  <h3>No results</h3>
)}
        </div>
    </div>

  )
}

const Grid = styled.div`
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(20rem, 1fr));
    grid-gap: 3rem;
`

const Card = styled.div`
    img{
        width: 100%;
        border-radius: 2rem;
    }
    a {
        text-decoration: none;
    }
    h4{
        text-align: center;
        padding: 1rem;
    }
`

export default Searched