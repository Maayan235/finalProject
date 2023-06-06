import { useEffect , useState} from "react";
import styled from "styled-components";
import '@splidejs/react-splide/css';
import { Link, json } from "react-router-dom";
import './Card.css'
import RecipeCard from "./RecipeCard";

function Recommended(userId) {
// needs to be changes to recommended instead of populr!!!
    const [details, setDetails] = useState({});
    const [temparray, settemparray] = useState([]);
    const [popular, setPopular] = useState([]);
    useEffect(() => {
        getPopular();
    }, []);



    const getPopular = async () => {
        
        const check = localStorage.getItem('popular');
        if(!check){
        //if(check){
            setPopular(JSON.parse(check));
        } else {
            //const api = await fetch(`https://api.spoonacular.com/recipes/random?apiKey=${process.env.REACT_APP_API_KEY}&number=6`);
            // const apii = await fetch(`https://api.spoonacular.com/recipes/random?apiKey=${process.env.REACT_APP_API_KEY}&number=1`);
            // const dataa = await apii.json();
            // settemparray(dataa.recipes);
            // const parseInstructions = (instructions) => {
            //   const regex = /<ol>(.*?)<\/ol>/g;
            //   const olMatches = instructions.match(regex);
            
            //   if (olMatches) {
            //     const parsedInstructions = olMatches.map(match => {
            //       const liRegex = /<li>(.*?)<\/li>/g;
            //       const liMatches = match.match(liRegex);
            //       const cleanInstructions = liMatches.map(li => li.replace(/<[^>]+>/g, ''));
            //       return cleanInstructions;
            //     });
            
            //     const flattenedInstructions = parsedInstructions.flat();
            //     return flattenedInstructions;
            //   } else {
            //     return instructions.split("\n");
            //   }
            // };
            
            // const recipes = dataa.recipes.map(recipe => ({
            //   title: recipe.title,
            //   image: recipe.image,
            //   instructions: parseInstructions(recipe.instructions),
            //   ingredients: recipe.extendedIngredients.map(ingredient => ingredient.original),
            //   tags: [
            //     ...(recipe.vegan ? ['vegan'] : []),
            //     ...(recipe.vegetarian ? ['vegetarian'] : []),
            //     ...(recipe.dairyFree ? [] : ['dairy'])
            //   ],
            //   types: (recipe.cuisines || [])
            //     .filter(cuisine => ['italian', 'thai', 'american', 'japanese'].includes(cuisine.toLowerCase()))
            //     .map(cuisine => cuisine.toLowerCase()),
            //   usersCount: 0,
            //   userFavoritesCount: 0,
            // }));

            // recipes.forEach(async (recipe) => {
            //   try {
            //     const response = await fetch("http://localhost:5000/recipes/add", {
            //       method: "POST",
            //       headers: {
            //         "Content-Type": "application/json",
            //       },
            //       body: JSON.stringify(recipe),
            //     });
            
            //     if (response.ok) {
            //       console.log("Recipe added successfully:", recipe.title);
            //     } else {
            //       console.error("Failed to add recipe:", recipe.title);
            //     }
            //   } catch (error) {
            //     console.error("Error occurred while adding recipe:", recipe.title);
            //     console.error(error);
            //   }
            // });
            
            


            const api = await fetch(`http://localhost:5000/users/recommended/${userId.userId}`);
            const data = await api.json();
            console.log(data)
            localStorage.setItem('popular', JSON.stringify(data));
            setPopular(data);
        }
        
    };

    return (
        <div>
          <HomeText>Recommended for you:</HomeText>
          <br></br>
          <div className="card-container">
            {popular &&
              popular.map((recipe) => (
                <div className="card">
                  <RecipeCard recipe={recipe} />
                </div>
              ))}
          </div>
        </div>
      );
}

const Wrapper = styled.div`
margin: 4rem 0rem;`

const HomeText = styled.h2`
font-family: Georgia;
font-size: 1.5rem;
text-align: center;
color: #333;
background-color: white;
padding: 1rem;
border-radius: 0.2rem;
box-shadow: 0 0.5rem 1rem rgba(0, 0, 0, 0.1);
`;


export default Recommended;