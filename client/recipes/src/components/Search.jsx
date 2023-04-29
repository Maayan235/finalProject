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
    setInput(""); // reset the input field to an empty string
};

  return (
    <div>
        <FormStyle onSubmit={submitHandler}>
            <div>
                 <FaSearch ></FaSearch>
                <input onChange={(e) => setInput(e.target.value)} type={Text} value={input} placeholder="Search..."/>
            </div>

        </FormStyle>
    </div>

  )
}

const FormStyle = styled.form`
    position: absolute;
    top: 0;
    right: 5%;
    padding: 3px 15px;
    font-size: 12px;
    color: rgb(0, 0, 0);
    // margin: 0rem 20rem;
    
    
    // div{
    //     display: flex;
    //     justify-content: center;
    //     align-items: center; 
    //     position: relative;
    //     width: 100%;
    // }
    
    // input{
    //     border: 2px solid #40555a;
    //     background-color: white;
    //     font-size: 1.0rem;
    //     padding: 1rem 1rem;
    //     border-radius: 1rem;
    //     width: 100%;
    // }
    svg{
        position: absolute;
        right: 20%;
        bottom: 45%;
        transform: translate(100%, -50%);
        color: #D3D3D3
    }
`

export default Search
