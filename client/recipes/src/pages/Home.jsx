import Veggie from "../components/Veggie";
import Popular from "../components/Popular";
import { useEffect, useState } from 'react';
import React from 'react'
import Category from "../components/Category";
import Search from "../components/Search";

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
    <div>
        <h4 >Hello {username}, what would you like to cook today?</h4>
        <br></br>
        <Search />
        <Category />
        <Popular />
    </div>
  );
}

export default Home;