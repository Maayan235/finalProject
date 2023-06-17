import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import './Card.css';
import RecipeCard from "./RecipeCard";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

function Recommended() {
  const [recentRecipes, setRecentRecipes] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const recipesPerPage = 9;
  const totalRecipes = recentRecipes.length;

  useEffect(() => {
    getRecentRecipes();
  }, []);

  const getRecentRecipes = async () => {
    const api = await fetch("http://localhost:5000/latest-recipes"); // Replace with your backend API endpoint
    const data = await api.json();
    console.log(data);
    setRecentRecipes(data);
  };

  const settings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    swipeToSlide: true,
    afterChange: (currentSlide) => {
      setCurrentPage(currentSlide);
    },
    prevArrow: <PrevArrow />,
    nextArrow: <NextArrow />,
  };

  const totalPages = Math.ceil(totalRecipes / recipesPerPage);

  const handlePreviousClick = () => {
    setCurrentPage((prevPage) => Math.max(prevPage - 1, 0));
  };

  const handleNextClick = () => {
    setCurrentPage((prevPage) => Math.min(prevPage + 1, totalPages - 1));
  };

  const startIndex = currentPage * recipesPerPage;
  const endIndex = startIndex + recipesPerPage;
  const displayedRecipes = recentRecipes.slice(startIndex, endIndex);

  return (
    <div>
      <HomeText>Recent Recipes:</HomeText>
      <br></br>
      <SliderContainer>
        <Slider {...settings}>
          {Array.from({ length: totalPages }, (_, pageIndex) => (
            <div key={pageIndex}>
              <div className="card-container">
                {displayedRecipes.map((recipe) => (
                  <div className="card" key={recipe.id}>
                    <RecipeCard recipe={recipe} />
                  </div>
                ))}
              </div>
            </div>
          ))}
        </Slider>
      </SliderContainer>
    </div>
  );
}

const SliderContainer = styled.div`
  width: 100%;
  max-width: 800px;
  margin: 0 auto;
  padding: 1rem;
`;

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

const SliderArrow = styled.div`
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  display: flex;
  align-items: center;
  justify-content: center;
  width: 2rem;
  height: 2.5rem;
  background-color: rgba(0, 0, 0, 0.3);
  color: #fff;
  font-size: 2rem;
  border-radius: 50%;
  cursor: pointer;
  z-index: 1;
  padding: 0.5rem;

  &:hover {
    background-color: rgba(0, 0, 0, 0.5);
  }
  
  &.prev {
    left: 1rem;
  }
  
  &.next {
    right: 1rem;
  }
`;

const PrevArrow = ({ onClick }) => (
  <SliderArrow className="prev" onClick={onClick}>
    <FaChevronLeft />
  </SliderArrow>
);

const NextArrow = ({ onClick }) => (
  <SliderArrow className="next" onClick={onClick}>
    <FaChevronRight />
  </SliderArrow>
);

export default Recommended;
