import { useEffect , useState} from "react";
import styled from "styled-components";
import '@splidejs/react-splide/css';
import { Link } from "react-router-dom";
import '../components/Card.css'
import RecipeCard from "../components/RecipeCard";

function Favorites() {

    const [Favorites, setFavorites] = useState([]);
    useEffect(() => {
        getFavorites();
    }, []);



    const getFavorites = async () => {
        
        const check = localStorage.getItem('Favorites');

        if(check){
            setFavorites(JSON.parse(check));
        } else {
            const api = await fetch(`https://api.spoonacular.com/recipes/random?apiKey=${process.env.REACT_APP_API_KEY}&number=6`);
            const data = await api.json();

            localStorage.setItem('Favorites', JSON.stringify(data.recipes));
            setFavorites(data.recipes);
            console.log(data);
        }
        
    };

    return (
        <div>
            <h4 >Your favorites recipes:</h4>
            <br></br>
            <div className="card-container">
                {Favorites && Favorites.map((recipe) => (
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


export default Favorites;