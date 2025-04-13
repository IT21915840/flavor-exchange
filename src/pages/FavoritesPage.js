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
          <Grid item key={recipe.id} sx={{ display: 'flex' }}>
            <Link to={`/recipe/${recipe.id}`} style={{ textDecoration: 'none', width: '100%' }}>
              <Card
                sx={{
                  width: 250,
                  height: 270,
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  boxShadow: 3,
                  transition: 'transform 0.2s ease, box-shadow 0.2s ease',
                  '&:hover': {
                    transform: 'translateY(-5px)',
                    boxShadow: 6,
                  },
                }}
              >
                <CardMedia
                  component="img"
                  height="150"
                  image={recipe.image || 'https://via.placeholder.com/150'}
                  alt={recipe.title}
                  sx={{ objectFit: 'cover' }}
                />
                <CardContent sx={{ flexGrow: 1 }}>
                  <Typography variant="h6" sx={{
                    whiteSpace: 'nowrap',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                  }}>{recipe.title}</Typography>
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
