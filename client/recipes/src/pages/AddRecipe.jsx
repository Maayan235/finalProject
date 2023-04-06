import React, { useState } from "react";
import styled from 'styled-components';


import "./AddRecipe.css"; // Import the CSS file with the centering styles

function AddReciepe() {
  const [recipeName, setRecipeName] = useState("");
  const [ingredients, setIngredients] = useState("");
  const [recipePicture, setRecipePicture] = useState(null);
    const [instructions, setInstructions] = useState([""]);

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

  const handleRecipePictureChange = (event) => {
    setRecipePicture(event.target.files[0]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(e)
    // Do something with the recipe data
  };

  return (
    <FormWrapper  className="AddReciepe" onSubmit={handleSubmit}>
      <label>
        <div className="margin-top">Recipe Name:</div>
        <input type="text" value={recipeName} onChange={(e) => setRecipeName(e.target.value)} />
      </label>
     
      <label>
        <div className="margin-top">Ingredients:</div>
        <textarea value={ingredients} onChange={(e) => setIngredients(e.target.value)} />
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

      <button className="margin-top" type="submit" >Submit Recipe</button>
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
