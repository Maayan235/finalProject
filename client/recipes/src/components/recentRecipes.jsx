import { useEffect , useState} from "react";
import styled from "styled-components";
import '@splidejs/react-splide/css';
import { Link } from "react-router-dom";
import './Card.css'
import RecipeCard from "./RecipeCard";

function Recommended() {
// needs to be changes to recommended instead of populr!!!
// make the galary a carusale
    const [popular, setPopular] = useState([]);
    useEffect(() => {
        getPopular();
    }, []);



    const getPopular = async () => {
        // Maayan : change it to get the recent recipes + change the name popular to recent after that
        const check = localStorage.getItem('popular');

        if(check){
            setPopular(JSON.parse(check));
        } else {
            const api = await fetch(`https://api.spoonacular.com/recipes/random?apiKey=${process.env.REACT_APP_API_KEY}&number=20`);
            const data = await api.json();

            localStorage.setItem('popular', JSON.stringify(data.recipes));
            setPopular(data.recipes);
            console.log(data);
        }
        
    };

    return (
        <div>
            <HomeText >Recent Recipes:</HomeText>
            <br></br>
            <div className="card-container">
                {popular && popular.map((recipe) => (
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