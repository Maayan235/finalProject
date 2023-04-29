import Veggie from "../components/Veggie";
import Popular from "../components/Popular";
import { useEffect, useState } from 'react';
import React from 'react'
import Category from "../components/Category";
import Search from "../components/Search";
import styled from "styled-components";

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
        <HomeText>Hello, {username}! What would you like to cook today?</HomeText>
        <br></br>
        <Category />
        <br></br>
        <Popular />
    </Wrapper>
  );
}

const Wrapper = styled.div`
  margin: 0 auto;
  max-width: 900px;
  padding: 1rem;
`;

const HomeText = styled.h2`
  font-size: 1.5rem;
  font-weight: bold;
  text-align: center;
  margin-bottom: 1rem;
  color: #40555a;
`;

export default Home;
