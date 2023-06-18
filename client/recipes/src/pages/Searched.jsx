import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import RecipeCard from '../components/RecipeCard';
import '../components/Card.css';
import Search from '../components/Search';

function Searched() {
  const [searchedRecipes, setSearchRecipes] = useState([]);
  const [loading, setLoading] = useState(true);
  let params = useParams();

  useEffect(() => {
    async function getSearchedRecipes(search) {
      const response = await fetch(`http://localhost:5000/recipes/searched/${search}`);

      if (!response.ok) {
        const message = `An error occurred: ${response.statusText}`;
        window.alert(message);
        return;
      }

      const recipes = await response.json();
      setSearchRecipes(recipes);
      setLoading(false);
    }

    if (params.search) {
      getSearchedRecipes(params.search);
    }
  }, [params.search]);

  return (
    <div>
      <Search />
      <br />
      <br />
      <div className="card-container">
        {loading ? (
          <h3>Loading...</h3>
        ) : searchedRecipes && searchedRecipes.length > 0 ? (
          searchedRecipes.map((recipe) => (
            <div className="card">
              <RecipeCard recipe={recipe} />
            </div>
          ))
        ) : (
          <h3>No results...</h3>
        )}
      </div>
    </div>
  );
}

export default Searched;
