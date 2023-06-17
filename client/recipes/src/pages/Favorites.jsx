import { useEffect , useState} from "react";
import styled from "styled-components";
import '@splidejs/react-splide/css';
import { Link } from "react-router-dom";
import '../components/Card.css'
import RecipeCard from "../components/RecipeCard";


function Favorites({userId}) {

    const [Favorites, setFavorites] = useState([]);

useEffect(() => {
  async function getFavorites() {
    const response = await fetch(`http://localhost:5000/users/${userId}`);
  
    if (!response.ok) {
      const message = `An error occured: ${response.statusText}`;
      window.alert(message);
      return;
    }
  
    const user = await response.json();
    const favoritesRecipeIds = user.favoritesRecipes;
    const favoritesRecipePromises = favoritesRecipeIds.map(async (recipeId) => {
      const recipeResponse = await fetch(`http://localhost:5000/recipe/${recipeId}`);
      const recipe = await recipeResponse.json();
      return recipe;
    });
    const favoriteRecipes = await Promise.all(favoritesRecipePromises);
    setFavorites(favoriteRecipes);
  }

  getFavorites();
}, []);

    return (
        <div>
            <br></br>
            <br></br>
            <h4 >Favorites:</h4>
            <br></br>
            <div className="card-container">
                {Favorites && Favorites.map((recipe) => (
                    <div className="card">
                    <RecipeCard recipe = {recipe}/>
                    </div>
                ))}
            </div>
        </div>

    )
}


export default Favorites;