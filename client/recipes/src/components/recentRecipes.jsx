import { useEffect, useState } from "react";
import styled from "styled-components";
import '@splidejs/react-splide/css';
import { Link } from "react-router-dom";
import './Card.css';
import RecipeCard from "./RecipeCard";

function Recommended() {
  const [recentRecipes, setRecentRecipes] = useState([]);

  useEffect(() => {
    getRecentRecipes();
  }, []);

  const getRecentRecipes = async () => {
    const api = await fetch("http://localhost:5000/latest-recipes"); // Replace with your backend API endpoint
    const data = await api.json();
    console.log(data);
    setRecentRecipes(data);
  };

  return (
    <div>
      <HomeText>Recent Recipes:</HomeText>
      <br></br>
      <div className="card-container">
        {recentRecipes &&
          recentRecipes.map((recipe) => (
            <div className="card">
              <RecipeCard recipe={recipe} />
            </div>
          ))}
      </div>
    </div>
  );
}

const Wrapper = styled.div`
  margin: 4rem 0rem;
`;

const HomeText = styled.h2`
  font-family: Georgia;
  font-size: 1.5rem;
  text-align: center;
  color: #333;
  background-color: white;
  padding: 1rem;
  border-radius: 0.2rem;
  box-shadow: 0 0.5rem 1rem rgba(0, 0, 0, 0.1);
`;

export default Recommended;