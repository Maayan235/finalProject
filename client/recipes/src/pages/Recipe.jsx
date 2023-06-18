import React from 'react'
import { useEffect, useState } from 'react'
import styled from 'styled-components'
import { useParams } from 'react-router-dom'
import VoiceAssistent from '../components/VoiceAssistent';
import { FaEdit, FaTrash, FaTimes } from "react-icons/fa";
import favoriteBtn from '../images/favorite_icon.png'
import favoriteBtnActive from '../images/favorite_icon_active.png'
import { Link } from "react-router-dom";
import noImage from '../images/noimageavailable.png'


function Recipe({userId}) {

  const [recipe, setRecipe] = useState([]);
  const [activeTab, setActiveTab] = useState("instructions");
  const [isFavorite, setIsFavorite] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const [isMyRecipe, setIsMyRecipe] = useState(false);
  const [recipeImageUrl, setRecipeImageUrl] = useState(noImage);

  let params = useParams();

  const openPopup = () => {
    setShowPopup(true);
  }

  const closePopup = () => {
    setShowPopup(false);
  }


  const handleFavoriteClick = () => {
    if (isFavorite) {
      // remove from user favorites
      fetch(`http://localhost:5000/users/removeFavorite/${recipe._id}/${userId}`, { method: 'PUT' }) 
      // remove from recipe user favorites count
      fetch(`http://localhost:5000/recipes/removeFavorite/${recipe._id}`, { method: 'PUT' })
    } else {
      // add to user favorites
      fetch(`http://localhost:5000/users/addFavorite/${recipe._id}/${userId}`, { method: 'PUT' })
      // add to recipe user favorites count
      fetch(`http://localhost:5000/recipes/addFavorite/${recipe._id}`, { method: 'PUT' })
    }
    setIsFavorite(!isFavorite);
  }


  const handleDeleteClick = () => {
    //const response = await fetch(`http://localhost:5000/recipes/delete/${recipeId}`)
    const response = fetch(`http://localhost:5000/recipes/delete/${recipe._id}/${userId}`, {
      method: 'PUT'
    })//?param1=${param1}&param2=${param2}
    // handle delete logic
    // Maayan
  }

  // const instructionsList = ['step one','Add 500 ml of water and mix well. jump on one leg, put your finger on your tongue', 'step three.' ]
  // const ingridients = ['water, bla ,blabla' ]

  useEffect(() => {
    const fetchRecipe = async (name) => {
      try {
        const recipeResponse = await fetch(`http://localhost:5000/recipe/${name}`);
  
        if (!recipeResponse.ok) {
          throw new Error(`HTTP error! Status: ${recipeResponse.status}`);
        }
  
        const recipe = await recipeResponse.json();
        setRecipe(recipe);
        checkIfMyRecipe(recipe._id);
        if (recipe.image) {
          setRecipeImageUrl(recipe.image);
        }
      } catch (error) {
        console.error('Error fetching recipe:', error);
      }
    };
  
    const checkIfMyRecipe = async (recipeId) => {
      try {
        const userResponse = await fetch(`http://localhost:5000/users/${userId}`);
  
        if (!userResponse.ok) {
          throw new Error(`An error occurred: ${userResponse.statusText}`);
        }
  
        const user = await userResponse.json();
        const myRecipes = user.myRecipes;
        const favoriteRecipes = user.favoritesRecipes;
  
        setIsMyRecipe(myRecipes.includes(recipeId));
        setIsFavorite(favoriteRecipes.includes(recipeId));
      } catch (error) {
        console.error('Error checking if recipe is favorite:', error);
        window.alert('An error occurred while checking if the recipe is a favorite.');
      }
    };
  
    if (params.name) {
      fetchRecipe(params.name);
    }
  
    return () => {
      // Cleanup function to revoke the URL object when the component unmounts
      if (recipeImageUrl) {
        URL.revokeObjectURL(recipeImageUrl);
      }
    };
  }, [params.name, userId]);


  return (
    <DetailWrapper>
    <div className='top'>
      <h2>{recipe.title}</h2>
      <img class= "recipeImg" src={recipeImageUrl} alt="Recipe" />
      <div className={`favorite-icon ${isFavorite ? 'active' : ''}`} onClick={handleFavoriteClick}>
      {isFavorite ? (
        <img src={favoriteBtnActive}></img>
      ) : (
        <img src={favoriteBtn}></img>
      )}
      </div>


      {isMyRecipe && (
        <div>
        <Link to={`/editRecipe/${recipe._id}`}>
          <div className="edit-icon"><FaEdit /></div>
        </Link>

        <Link to="/">
          <div className="delete-icon" onClick={handleDeleteClick}><FaTrash /></div>
        </Link>
        </div>
        
        )}

      <div>
      </div>
    </div>


      <div>
        <VoiceAssistent instructions = {recipe.instructions} openPopup={openPopup}/>
        <div className="button-container">
          <button className={activeTab === "instructions" ? "active" : ""} onClick={() => setActiveTab("instructions")}> Instructions </button>
          <button className={activeTab === "ingredients" ? "active" : ""} onClick={() => setActiveTab("ingredients")}> Ingredients </button>
      </div>

      {activeTab === "instructions" && (
        <ul>
        {recipe.instructions && recipe.instructions.map((inst) => (
          <li>{inst}</li>
        ))}
      </ul>
      )}

      {activeTab === "ingredients" && (
        <ul>
        {recipe.ingredients && recipe.ingredients.map((ingridient) => (
          <li>{ingridient}</li>
        ))}
      </ul>
      )}

      {showPopup && (
      <div className="popup">
        <p>Please say:</p>
          <p><b>"next"</b> for next line</p>
          <p><b>"back"</b> for previous line</p>
          <p><b>"again"</b> to hear the line again</p>
          <p><b>"finish"</b> to finish the recipe reading</p>
        <button onClick={closePopup} className="close"><FaTimes/></button>
      </div>
      )}
    </div>

   </DetailWrapper>

  );
}

const DetailWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 3rem auto;
  max-width: 900px;
  width: 85%;
  padding: 2rem;
  background-color: white;
  border-radius: 1rem;
  position: relative;

  .top {
    display: flex;
    align-items: center;
  }

  h2 {
    margin: 3rem 0;
    padding: 2rem;
  }

  .recipeImg {
    max-width: 300px;
    max-height: 250px;
    width: 35%;
    height: 35%;
    border-radius: 15%;
    border: 6px solid rgb(226, 217, 207);
  }

  .button-container {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
  }

  button {
    background-color: rgb(226, 217, 207);
    color: white;
    border: none;
    padding: 1rem 1rem;
    border-radius: 1rem;
    font-size: 1rem;
    margin: 1rem 0.5rem;
    cursor: pointer;
    width: 200px;
    font-size: 1.2rem;
  }

  .button-container button.active {
    background-color: #40555a;
  }

  .start {
    display: block;
    margin: 1rem auto;
    background-color: #f06a44;
  }

  .favorite-icon {
    position: absolute;
    top: 1rem;
    left: 1rem;
    cursor: pointer;
    display: block;
    width: 10%;
    border: none;
  }

  img {
    width: 30%;
    height: 30%;
  }

  .edit-icon {
    font-size: 1.5rem;
    position: absolute;
    top: 0.6rem;
    left: 7%;
    cursor: pointer;
    display: block;
    width: 10%;
    border: none;
    color: black;
  }

  .delete-icon {
    font-size: 1.2rem;
    position: absolute;
    top: 0.9rem;
    left: 12%;
    cursor: pointer;
    display: block;
    width: 10%;
    border: none;
    color: black;
  }

  .popup {
    position: fixed;
    top: 4rem;
    right: 2rem;
    background-color: #ffffff;
    padding: 1rem;
    border-radius: 1rem;
    box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.25);
    z-index: 999;
  }

  .popup p {
    margin-bottom: 1rem;
  }

  .popup button {
    position: absolute;
    top: 0;
    right: 0;
    padding: 0;
    width: 20%;
    background-color: transparent;
    border: none;
    font-size: 1.5rem;
    cursor: pointer;
    color: gray;
  }
  

`;


export default Recipe 