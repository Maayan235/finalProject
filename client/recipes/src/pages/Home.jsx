import Veggie from "../components/Veggie";
import Popular from "../components/Popular";
import { useEffect, useState } from 'react';
import React from 'react'
import Category from "../components/Category";
import Search from "../components/Search";
import styled from "styled-components";
import AudioChefImg from "../images/chef2.png";

function Home({userId}) {

  const [username, setUsername] = useState('');

  // This method fetches the records from the database.
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
      <ContentWrapper>
        <ImageWrapper>
          <AudioChefCover src={AudioChefImg} alt="AudioChef" />
        </ImageWrapper>
        <TextWrapper>
          <Slogan>Cook with your ears, not just your eyes - Welcome to AudioChef!</Slogan>
          
        </TextWrapper>
      </ContentWrapper>
      <HomeText>Hello, {username}! What would you like to cook today?</HomeText>
      <Category />
      <Popular />
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

const ImageWrapper = styled.div`
  flex-basis: 40%;
`;

const AudioChefCover = styled.img`
  display: block;
  margin: 0 auto;
  width: 100%;
  max-width: 600px;
  height: auto;
`;

const Slogan = styled.p`
  margin-top: 0;
  font-size: 2rem;
  font-weight: bold;
  color: #40555a;
`;

const HomeText = styled.h2`
  font-size: 1.5rem;
  font-weight: bold;
  text-align: left;
  margin-top: 1.5rem;
  color: #40555a;
`;

export default Home;
