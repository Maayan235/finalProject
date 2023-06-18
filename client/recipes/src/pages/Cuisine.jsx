import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { Link, useParams } from 'react-router-dom';
import RecipeCard from '../components/RecipeCard';
import '../components/Card.css';

function Cuisine() {
  const [cuisine, setCuisine] = useState([]);
  const [recipes, setRecipes] = useState([]);
  const [recipesByType, setRecipesByType] = useState([]);
  const [filteredRecipes, setFilteredRecipes] = useState([]);
  const [selectedTags, setSelectedTags] = useState([]);

  let params = useParams();

  // Fetch recipes based on the selected cuisine type
  useEffect(() => {
    async function getRecipes(type) {
      const response = await fetch(`http://localhost:5000/recipes/cuisine/${type}`);
      if (!response.ok) {
        const message = `An error occurred: ${response.statusText}`;
        window.alert(message);
        return;
      }
      const recipes = await response.json();
      setRecipes(recipes);
      setFilteredRecipes(recipes);
    }

    if (params.type) {
      getRecipes(params.type);
    }
  }, [params.type]);

  // Filter recipes based on selected tags
  useEffect(() => {
    if (selectedTags.length === 0) {
      setFilteredRecipes(recipes);
    } else {
      const filtered = recipes.filter((recipe) => {
        return selectedTags.every((tag) => recipe.tags.includes(tag));
      });
      setFilteredRecipes(filtered);
    }
  }, [selectedTags, recipes]);

  const handleTagClick = (tag) => {
    setSelectedTags((prevTags) => {
      if (prevTags.includes(tag)) {
        return prevTags.filter((t) => t !== tag);
      } else {
        return [...prevTags, tag];
      }
    });
  };

  return (
    <div>
      <br />
      <br />
      <h3>{params.type.charAt(0).toUpperCase() + params.type.slice(1)} Food</h3>
      <FilterContainer>
        <FilterTitle>Filter By:</FilterTitle>
        <TagsContainer>
          <Tag
            active={selectedTags.includes('dairy')}
            onClick={() => handleTagClick('dairy')}
          >
            Dairy
          </Tag>
          <Tag
            active={selectedTags.includes('vegan')}
            onClick={() => handleTagClick('vegan')}
          >
            Vegan
          </Tag>
          <Tag
            active={selectedTags.includes('vegetarian')}
            onClick={() => handleTagClick('vegetarian')}
          >
            Vegetarian
          </Tag>
          <Tag
            active={selectedTags.includes('kosher')}
            onClick={() => handleTagClick('kosher')}
          >
            Kosher
          </Tag>
          <Tag
            active={selectedTags.includes('meat')}
            onClick={() => handleTagClick('meat')}
          >
            Meat
          </Tag>
        </TagsContainer>
      </FilterContainer>
      <div className="card-container">
        {filteredRecipes &&
          filteredRecipes.map((recipe) => (
            <div className="card">
              <RecipeCard recipe={recipe} />
            </div>
          ))}
      </div>
    </div>
  );
}

const FilterContainer = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 1rem;
`;

const FilterTitle = styled.h4`
  margin-right: 1rem;
`;

const TagsContainer = styled.div`
  display: flex;
  align-items: center;
`;

const Tag = styled.div`
  background-color: ${(props) => (props.active ? '#333' : '#ccc')};
  color: #fff;
  padding: 0.5rem 1rem;
  margin-right: 0.5rem;
  cursor: pointer;
`;

export default Cuisine;
