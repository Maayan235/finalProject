import React, { useState } from "react";
import { useNavigate } from "react-router";
import styled from 'styled-components';
import Compressor from 'compressorjs';

import "./AddRecipe.css"; // Import the CSS file with the centering styles

function AddReciepe() {
  const [recipeTitle, setRecipeTitle] = useState("");
  const [ingredients, setIngredients] = useState([""]);
  const [recipePicture, setRecipePicture] = useState(null);
  const[recipePictureFormat, setRecipePictureFormat] = useState(null);
  const [instructions, setInstructions] = useState([""]);
  const [tags, setTags] = useState([""]);
  const [types, setTypes] = useState([""]);

  const handleInstructionChange = (idx, e) => {
    const newInstructions = [...instructions];
    newInstructions[idx] = e.target.value;
    setInstructions(newInstructions);
  };

  const handleAddInstruction = () => {
    const newInstructions = [...instructions];
    newInstructions.push("");
    setInstructions(newInstructions);
  };

  const handleIngredientChange = (idx, e) => {
    const newIngredients = [...ingredients];
    newIngredients[idx] = e.target.value;
    setIngredients(newIngredients);
  };

  const handleAddIngredient = () => {
    const newIngredients = [...ingredients];
    newIngredients.push("");
    setIngredients(newIngredients);
  };

  const handleRecipePictureChange = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();
  
    reader.readAsDataURL(file);
    
    reader.onload = () => {
      const dataURL = reader.result;
      const imageFormat = dataURL.split(",")[0].split(":")[1].split(";")[0];
  
      // Use Compressor library to reduce image size
      new Compressor(file, {
        quality: 0.6,
        success(result) {
          const compressedFile = new File([result], file.name, { type: result.type });
  
          const reader2 = new FileReader();
          reader2.readAsDataURL(compressedFile);
          reader2.onload = () => {
            const dataURL2 = reader2.result;
            setRecipePicture(dataURL2);
            setRecipePictureFormat(imageFormat);
          };
        },
        error(err) {
          console.log(err.message);
        },
      });
    };
  };

  const newRecipe = {
    title: recipeTitle,
    ingredients: ingredients,
    instructions: instructions,
    image: recipePicture,
    imageFormat: recipePictureFormat,
    imageFormat: recipePictureFormat,
    tags: tags,
    types: types
  };

  async function handleSubmit(e) {
    e.preventDefault();
    console.log(e);
    console.log(JSON.stringify(newRecipe));
    await fetch("http://localhost:5000/recipes/add", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newRecipe),
    })
    .catch(error => {
      window.alert(error);
      return;
    });

    // setForm({ recipeTitle: "", ingredients: [""], recipePicture: "", instructions: [""], tags: [""], types: [""] });
    // navigate("/");    
  };

  return (
    <FormWrapper  className="AddReciepe" onSubmit={handleSubmit}>
      <label>
        <div className="margin-top">Recipe Name:</div>
        <input type="text" value={recipeTitle} onChange={(e) => setRecipeTitle(e.target.value)} />
      </label>

      <label>
      <div className="margin-top">Ingredients:</div>
      {ingredients.map((ingredient, idx) => (
          <div key={idx} className="instruction-row">
          <div className="instruction-number">{idx + 1}.</div>
          <input
              type="text"
              value={ingredient}
              onChange={(e) => handleIngredientChange(idx, e)}
          />
          </div>
      ))}
      <button className="margin-top" type="button" onClick={handleAddIngredient}>
          Add Ingredient
      </button>
    </label>


      <label>
        <div className="margin-top">Instructions:</div>
        {instructions.map((instruction, idx) => (
            <div key={idx} className="instruction-row">
            <div className="instruction-number">{idx + 1}.</div>
            <input
                type="text"
                value={instruction}
                onChange={(e) => handleInstructionChange(idx, e)}
            />
            </div>
        ))}
        <button className="margin-top" type="button" onClick={handleAddInstruction}>
            Add Instruction
        </button>
      </label>

      <label>
        <div className="margin-top">Recipe Picture:</div>
        <input type="file" onChange={handleRecipePictureChange} />
      </label>

      <label for="food-type">Select Recipe types:</label>
      <div class="checkbox-group" id="food-type">
      <div>
        <input type="checkbox" id="veggie" name="veggie" value="veggie"/>
        <label for="veggie">Veggie</label>

        <input type="checkbox" id="vegetarian" name="vegetarian" value="vegetarian"/>
        <label for="vegetarian">Vegetarian</label>

        <input type="checkbox" id="kosher" name="kosher" value="kosher"/>
        <label for="kosher">Kosher</label>
		  </div>

		<div>
			<input type="checkbox" id="meat" name="meat" value="meat"/>
			<label for="meat">Meat</label>

			<input type="checkbox" id="dairy" name="dairy" value="dairy"/>
			<label for="dairy">Dairy</label>

			<input type="checkbox" id="italian" name="italian" value="italian"/>
			<label for="italian">Italian</label>
		</div>

		<div>
			<input type="checkbox" id="thai" name="thai" value="thai"/>
			<label for="thai">Thai</label>

			<input type="checkbox" id="american" name="american" value="american"/>
			<label for="american">American</label>

			<input type="checkbox" id="japanese" name="japanese" value="japanese"/>
			<label for="japanese">Japanese</label>
		</div>
    </div>

      <input className="margin-top" type="submit" value="Submit Recipe"/>
    </FormWrapper >
  );

  
}

const FormWrapper = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 1rem auto;
  max-width: 900px;
  width: 85%;
  padding: 2rem;
  background-color: white;
  border-radius: 1rem;
  justify-content: center;
  min-height: 150vh;

  label {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    margin: 1rem 0;
    width: 100%;
  }

  .margin-top {
    margin-top: 1rem;
  }

  input[type='text'],
  textarea,
  input[type='file'] {
    width: 100%;
    padding: 1rem;
    font-size: 1rem;
    border-radius: 0.5rem;
    border: none;
    box-shadow: 0px 2px 6px rgba(0, 0, 0, 0.2);
    margin-top: 0.5rem;
  }

  textarea {
    height: 8rem;
  }

  button {
    background-color: #40555a;
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

  button[type='button'] {
    
    margin-top: 1rem;
  }

  button[type='submit'] {
    margin-top: 2rem;
    background-color: #f06a44;
  }

  input[type='file'] {
    margin-top: 0;
  }

  
`;


export default AddReciepe;
