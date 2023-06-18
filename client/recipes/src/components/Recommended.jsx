import { useEffect , useState} from "react";
import styled from "styled-components";
import '@splidejs/react-splide/css';
import './Card.css'
import RecipeCard from "./RecipeCard";

function Recommended(userId) {
    const [recommended, setRecommended] = useState([]);

    useEffect(() => {
        getRecommended();
    }, []);

    const getRecommended = async () => {
      const api = await fetch(`http://localhost:5000/users/recommended/${userId.userId}`);
      const data = await api.json();
      setRecommended(data);
    };

    return (
        <div>
          <HomeText>Recommended for you:</HomeText>
          <br></br>
          <div className="card-container">
            {recommended &&
              recommended.map((recipe) => (
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