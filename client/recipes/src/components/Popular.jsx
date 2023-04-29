import { useEffect , useState} from "react";
import styled from "styled-components";
import '@splidejs/react-splide/css';
import { Link } from "react-router-dom";
import './Card.css'
import RecipeCard from "./RecipeCard";

function Popular() {

    const [popular, setPopular] = useState([]);
    useEffect(() => {
        getPopular();
    }, []);



    const getPopular = async () => {
        
        const check = localStorage.getItem('popular');

        if(check){
            setPopular(JSON.parse(check));
        } else {
            const api = await fetch(`https://api.spoonacular.com/recipes/random?apiKey=${process.env.REACT_APP_API_KEY}&number=6`);
            const data = await api.json();

            localStorage.setItem('popular', JSON.stringify(data.recipes));
            setPopular(data.recipes);
            console.log(data);
        }
        
    };

    return (
        <div>
            <HomeText >Recommended for you:</HomeText>
            <br></br>
            <div className="card-container">
                {popular.map((recipe) => (
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
  font-size: 1.5rem;
  font-weight: bold;
  text-align: center;
  margin-bottom: 1rem;
  color: #40555a;
`;


export default Popular;