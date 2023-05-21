import React from 'react'
import { useEffect, useState } from 'react'
import styled from 'styled-components'
import { useParams } from 'react-router-dom'
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';
import { createSpeechlySpeechRecognition } from '@speechly/speech-recognition-polyfill';
import VoiceAssistent from '../components/VoiceAssistent';
import { FaRegStar, FaStar, FaEdit, FaTrash, FaTimes } from "react-icons/fa";
import { AiOutlineStar } from 'react-icons/ai';
import favoriteBtn from '../images/favorite_icon.png'
import favoriteBtnActive from '../images/favorite_icon_active.png'
import { Link } from "react-router-dom";



function Recipe({userId}) {

  const [recipe, setRecipe] = useState([]);
  const [activeTab, setActiveTab] = useState("instructions");
  const [isFavorite, setIsFavorite] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const [isMyRecipe, setIsMyRecipe] = useState(false);
  const [recipeImageUrl, setRecipeImageUrl] = useState(null);
  // const instructionsCopy = [...recipe.instructions];


  let params = useParams();

  const openPopup = () => {
    setShowPopup(true);
  }

  const closePopup = () => {
    setShowPopup(false);
  }


  const handleFavoriteClick = () => {
    setIsFavorite(!isFavorite);
    // Maayan +1 favorites
  }

  const handleEditClick = () => {
    // handle edit logic
  }

  const handleDeleteClick = () => {
    //const response = await fetch(`http://localhost:5000/recipes/delete/${recipeId}`)
    console.log(recipe._id)
    console.log(userId)
    const response = fetch(`http://localhost:5000/recipes/delete/${recipe._id}/${userId}`, {
      method: 'PUT'
    })//?param1=${param1}&param2=${param2}
    console.log(response)
    // handle delete logic
    // Maayan
  }

  // const instructionsList = ['step one','Add 500 ml of water and mix well. jump on one leg, put your finger on your tongue', 'step three.' ]
  // const ingridients = ['water, bla ,blabla' ]

  useEffect(() => {
    
    async function checkIfMyRecipe(recipeId) {
      const response = await fetch(`http://localhost:5000/users/${userId}`);
  
      if (!response.ok) {
        const message = `An error occured: ${response.statusText}`;
        window.alert(message);
        return;
      }
  
      const user = await response.json();
      const myRecipes = user.myRecipes;
      const favoriteRecipes = user.favoritesRecipes;

      if (myRecipes.includes(recipeId)) {
        setIsMyRecipe(true);
      } 
      if (favoriteRecipes.includes(recipeId)) {
        setIsFavorite(true);
      } 

    
    }
    
    async function getRecipe(name) {
      try {
        const response = await fetch(`http://localhost:5000/recipe/${name}`);
    
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
    
        const recipe = await response.json();
        setRecipe(recipe);
        checkIfMyRecipe(recipe._id);
    
        // Fetch image data and create URL
        const imageResponse = await fetch(`data:${recipe.imageFormat};base64,${recipe.image}`);
        const imageBlob = await imageResponse.blob();
        const imageUrl = URL.createObjectURL(imageBlob);
        setRecipeImageUrl(imageUrl);
      } catch (error) {
        console.error('Error fetching recipe:', error);
      }
    }
    
    


    if (params.name) {
      getRecipe(params.name);
    }
    console.log("recipe.instructions:", recipe.instructions)

}, [params.name]);


  return (
    <DetailWrapper>
    <div className='top'>
      <h2>{recipe.title}</h2>
      <img class= "recipeImg" src={recipeImageUrl} alt="" />
      <div className={`favorite-icon ${isFavorite ? 'active' : ''}`} onClick={handleFavoriteClick}>
      {isFavorite ? (
        <img src={favoriteBtn}></img>
      ) : (
        <img src={favoriteBtnActive}></img>
      )}
      </div>


      {isMyRecipe && (
        <div>
        <Link to={`/editRecipe/${recipe._id}`}>
          <div className="edit-icon" onClick={handleEditClick}><FaEdit /></div>
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
  margin: 1rem auto;
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