// src/pages/RecipeDetails.js
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { toggleFavorite } from '../redux/userSlice';
import {
  Typography,
  Card,
  CardContent,
  CardMedia,
  Button,
  Chip,
  Stack,
} from '@mui/material';

const RecipeDetails = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const favorites = useSelector(state => state.user.favorites);
  const [recipe, setRecipe] = useState(null);

  const isFavorite = favorites.includes(parseInt(id));

  useEffect(() => {
    axios.get(`http://localhost:3001/recipes/${id}`)
      .then(response => setRecipe(response.data))
      .catch(err => console.error("Failed to load recipe", err));
  }, [id]);

  if (!recipe) return <Typography>Loading recipe...</Typography>;

  return (
    <Card sx={{ maxWidth: 700, margin: '2rem auto', padding: '1rem' }}>
      <CardMedia
        component="img"
        height="300"
        image={recipe.image || 'https://via.placeholder.com/300'}
        alt={recipe.title}
      />
      <CardContent>
        <Typography variant="h4" gutterBottom>{recipe.title}</Typography>
        <Typography variant="subtitle1">Cooking Time: ⏱ {recipe.cookingTime} mins</Typography>
        <Typography variant="subtitle1">Rating: ⭐ {recipe.rating || 'N/A'}</Typography>

        <Typography variant="h6" mt={3}>Ingredients:</Typography>
        <Stack direction="row" spacing={1} flexWrap="wrap">
          {recipe.ingredients?.map((ing, idx) => (
            <Chip key={idx} label={ing} />
          ))}
        </Stack>

        <Typography variant="h6" mt={3}>Instructions:</Typography>
        <Typography>{recipe.instructions}</Typography>

        <Button
          variant={isFavorite ? 'contained' : 'outlined'}
          color="secondary"
          onClick={() => dispatch(toggleFavorite(recipe.id))}
          sx={{ mt: 3 }}
        >
          {isFavorite ? 'Remove from Favorites ❤️' : 'Save to Favorites 🤍'}
        </Button>
      </CardContent>
    </Card>
  );
};

export default RecipeDetails;
