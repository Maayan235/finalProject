import Recommended from "../components/Recommended";
import { useEffect, useState } from 'react';
import React from 'react'
import Category from "../components/Category";
import styled from "styled-components";
import AudioChefImg from "../images/homePageImg3.jpg";
import RecentRecipes from "../components/recentRecipes";

function Home({userId}) {

  const [username, setUsername] = useState('');

  useEffect(() => {
    async function getUser() {
      const response = await fetch(`http://localhost:5000/users/${userId}`);
  
      if (!response.ok) {
        const message = `An error occured: ${response.statusText}`;
        window.alert(message);
        return;
      }
  
      const user = await response.json();
      setUsername(user.username);
    }

    getUser();

  }, []);

  return (
    <Wrapper>
      <AudioChefCover src={AudioChefImg} alt="AudioChef" />
      <HomeText>Hello, {username}! What would you like to cook today?</HomeText>
      <Category />
      <br></br>
      <Recommended userId = {userId}/ >
      <br></br>
      <RecentRecipes />
    </Wrapper>
  );
}

const Wrapper = styled.div`
  margin: 0 auto;
  max-width: 900px;
  padding: 1rem;
`;

const ContentWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
`;

const TextWrapper = styled.div`
  flex-basis: 60%;
`;


const Slogan = styled.p`
  margin-top: 0;
  font-size: 2rem;
  font-weight: bold;
  color: #40555a;
`;

const HomeText = styled.h2`
  font-size: 1.5rem;
  text-align: center;
  color: #333;
  background-color: white;
  padding: 1rem;
  border-radius: 0.2rem;
  box-shadow: 0 0.5rem 1rem rgba(0, 0, 0, 0.1);
  margin-bottom:2rem;
  font-family: 'Frank Ruhl Libre', serif;
`;

const ImageWrapper = styled.div`
  flex-basis: 100%;
`;

const AudioChefCover = styled.img`
  display: block;
  margin: 0 auto;
  width: 80%;
  height: auto;
`;

export default Home;
