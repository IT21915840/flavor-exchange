// src/pages/FavoritesPage.js
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import axios from 'axios';
import {
  Typography,
  Grid,
  Card,
  CardContent,
  CardMedia,
} from '@mui/material';
import { Link } from 'react-router-dom';

const FavoritesPage = () => {
  const favoriteIds = useSelector(state => state.user.favorites);
  const [favoriteRecipes, setFavoriteRecipes] = useState([]);

  useEffect(() => {
    const fetchFavorites = async () => {
      try {
        const responses = await Promise.all(
          favoriteIds.map(id =>
            axios.get(`http://localhost:3001/recipes/${id}`).then(res => res.data)
          )
        );
        setFavoriteRecipes(responses);
      } catch (error) {
        console.error('Error loading favorites:', error);
      }
    };

    if (favoriteIds.length > 0) fetchFavorites();
    else setFavoriteRecipes([]);
  }, [favoriteIds]);

  return (
    <div style={{ padding: '2rem' }}>
      <Typography variant="h4" gutterBottom>
        Your Favorite Recipes ❤️
      </Typography>
      <Grid container spacing={3}>
        {favoriteRecipes.length > 0 ? favoriteRecipes.map(recipe => (
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
        )) : (
          <Typography variant="body1" sx={{ marginTop: 4 }}>No favorites yet.</Typography>
        )}
      </Grid>
    </div>
  );
};

export default FavoritesPage;
