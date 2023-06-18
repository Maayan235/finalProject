import { useEffect , useState} from "react";
import styled from "styled-components";
import '@splidejs/react-splide/css';
import '../components/Card.css'
import RecipeCard from "../components/RecipeCard";

function MyRecipes({userId}) {

  const [MyRecipes, setMyRecipes] = useState([]);

  useEffect(() => {
    async function getMyRecipes() {
      const response = await fetch(`http://localhost:5000/users/${userId}`);
    
      if (!response.ok) {
        const message = `An error occured: ${response.statusText}`;
        window.alert(message);
        return;
      }
    
      const user = await response.json();
      const myRecipeIds = user.myRecipes;
      const myRecipePromises = myRecipeIds.map(async (recipeId) => {
        const recipeResponse = await fetch(`http://localhost:5000/recipe/${recipeId}`);
        const recipe = await recipeResponse.json();
        return recipe;
      });
      const myRecipes = await Promise.all(myRecipePromises);
      setMyRecipes(myRecipes);
    }

    getMyRecipes();
  }, []);

    return (
        <div>
        <br></br>
        <br></br>
            <h4 >My recipes:</h4>
            <br></br>
            <div className="card-container">
                {MyRecipes && MyRecipes.map((recipe) => (
                    <div className="card">
                    <RecipeCard recipe = {recipe}/>
                    </div>
                ))}
            </div>
        </div>

    )
}

const Wrapper = styled.div`
margin: 4rem 0rem;`


export default MyRecipes;