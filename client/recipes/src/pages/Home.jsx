import Veggie from "../components/Veggie";
import Popular from "../components/Popular";

import React from 'react'
import Category from "../components/Category";
import Search from "../components/Search";

function Home() {
  return (
    <div>
        <h4 >Hello ____, what would you like to cook today?</h4>
        <br></br>
        <Search />
        <Category />
        <Popular />
    </div>
  );
}

export default Home;