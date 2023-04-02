import React from 'react'
import styled from "styled-components";
import { useState } from "react";
import {FaSearch} from "react-icons/fa";
import { useNavigate } from "react-router-dom";

function Search() {

const [input,setInput] = useState("")
const navigate = useNavigate();
const submitHandler = (e) => {
    e.preventDefault();
    navigate('/searched/'+input)
};

  return (
    <div>
        <FormStyle onSubmit={submitHandler}>
            <div>
                <FaSearch></FaSearch>
                <input onChange={(e) => setInput(e.target.value)} type={Text} value={input}/>
            </div>
            
        </FormStyle>
    </div>

  )
}

const FormStyle = styled.form`
    
    margin: 0rem 20rem;
    
    
    div{
        display: flex;
        justify-content: center;
        align-items: center; 
        position: relative;
        width: 100%;
    }
    
    input{
        border: 2px solid #40555a;
        background-color: #f1f1f1;
        font-size: 1.5rem;
        padding: 1rem 1rem;
        border-radius: 2rem;
        width: 100%;
    }
    svg{
        position: absolute;
        top: 50%;
        right: 10%;
        transform: translate(100%, -50%);
        color: #40555a
        
    }
`

export default Search