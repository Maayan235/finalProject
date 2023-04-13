import React from 'react'
import { useEffect, useState } from 'react'
import styled from 'styled-components'
import { useParams } from 'react-router-dom'
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';
import { createSpeechlySpeechRecognition } from '@speechly/speech-recognition-polyfill';
import VoiceAssistent from '../components/VoiceAssistent';
import { FaRegStar, FaStar } from "react-icons/fa";
import { AiOutlineStar } from 'react-icons/ai';
import favoriteBtn from '../images/favorite_icon.png'
import favoriteBtnActive from '../images/favorite_icon_active.png'


function Recipe() {

  const [recipe, setRecipe] = useState([]);
  const [activeTab, setActiveTab] = useState("instructions");
  const [isFavorite, setIsFavorite] = useState(false);
  // const instructionsCopy = [...recipe.instructions];


  const handleFavoriteClick = () => {
    setIsFavorite(!isFavorite);
  }

  let params = useParams();

  // const instructionsList = ['step one','Add 500 ml of water and mix well. jump on one leg, put your finger on your tongue', 'step three.' ]
  // const ingridients = ['water, bla ,blabla' ]

  useEffect(() => {
    async function getRecipe(name) {
        const response = await fetch(`http://localhost:5000/recipe/${name}`);
    
        if (!response.ok) {
            const message = `An error occured: ${response.statusText}`;
            window.alert(message);
            return;
        }
    
        const recipe = await response.json();
        setRecipe(recipe);
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
      <img class= "recipeImg"src={recipe.image} alt="" />
      <div className={`favorite-icon ${isFavorite ? 'active' : ''}`} onClick={handleFavoriteClick}>
      {isFavorite ? (
        <img src={favoriteBtn}></img>
      ) : (
        <img src={favoriteBtnActive}></img>
      )}
      </div>
      <div>
      
      </div>
    </div>


      <div>
        <VoiceAssistent instructions = {recipe.instructions}/>
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
    border: 6px solid rgb(226, 217, 207)

  }


  .button-container {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
  }

  button {
    background-color:  rgb(226, 217, 207);
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
    background-color:#40555a;
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
  width:20%;
  border:none;
}

img{
  width: 30%;
  height: 30%;
}


`;






export default Recipe 