// src/pages/HomePage.js
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setRecipes } from '../redux/recipeSlice';
import axios from 'axios';
import { Link } from 'react-router-dom';
import {
  Grid,
  Card,
  CardContent,
  CardMedia,
  Typography,
  TextField,
} from '@mui/material';

const HomePage = () => {
  const dispatch = useDispatch();
  const recipes = useSelector(state => state.recipes.items);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    axios.get('http://localhost:3001/recipes')
      .then(response => {
        dispatch(setRecipes(response.data));
      })
      .catch(error => {
        console.error("Failed to fetch recipes:", error);
      });
  }, [dispatch]);

  const filteredRecipes = recipes.filter(recipe =>
    recipe.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    recipe.ingredients?.join(' ').toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div style={{ padding: '2rem' }}>
      <Typography variant="h4" gutterBottom>Recipe Feed</Typography>
      <TextField
        fullWidth
        label="Search recipes"
        variant="outlined"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        style={{ marginBottom: '2rem' }}
      />
      <Grid container spacing={3}>
        {filteredRecipes.map(recipe => (
          <Grid item xs={12} sm={6} md={4} key={recipe.id}>
            <Link to={`/recipe/${recipe.id}`} style={{ textDecoration: 'none' }}>
              <Card>
                <CardMedia
                  component="img"
                  height="140"
                  image={recipe.image || 'https://via.placeholder.com/150'}
                  alt={recipe.title}
                />
                <CardContent>
                  <Typography variant="h6">{recipe.title}</Typography>
                  <Typography variant="body2">⏱ {recipe.cookingTime} mins</Typography>
                  <Typography variant="body2">⭐ {recipe.rating || 'N/A'}</Typography>
                </CardContent>
              </Card>
            </Link>
          </Grid>
        ))}
      </Grid>
    </div>
  );
};

export default HomePage;
