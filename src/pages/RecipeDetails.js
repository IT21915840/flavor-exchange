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
import { useNavigate } from 'react-router-dom';

const RecipeDetails = () => {
    const { id } = useParams();
    const dispatch = useDispatch();
    const favorites = useSelector(state => state.user.favorites);
    const currentUser = useSelector(state => state.user.user);
    const [recipe, setRecipe] = useState(null);
    const [timeLeft, setTimeLeft] = useState(null);

    const navigate = useNavigate();

    useEffect(() => {
        if (timeLeft === null) return;
        if (timeLeft === 0) {
          alert("Time's up!");
          setTimeLeft(null);
          return;
        }
      
        const timer = setTimeout(() => {
          setTimeLeft(prev => prev - 1);
        }, 1000);
      
        return () => clearTimeout(timer);
      }, [timeLeft]);
      
    
    useEffect(() => {
        axios.get(`http://localhost:3001/recipes/${id}`)
        .then(response => setRecipe(response.data))
        .catch(err => console.error("Failed to load recipe", err));
    }, [id]);

    if (!recipe) return <Typography>Loading recipe...</Typography>;

    const isFavorite = favorites.includes(parseInt(id));
    const isOwner = currentUser?.username === recipe.owner;

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

            <Typography variant="h6" mt={3}>Ingredient Substitutions:</Typography>
            <ul>
            {recipe.ingredients.map((ing, idx) => {
                const sub = {
                milk: 'almond milk',
                butter: 'coconut oil',
                eggs: 'chia seeds',
                cheese: 'chashew cheese',
                flour: 'almond flour',
                }[ing.toLowerCase()];
                return (
                <li key={idx}>
                    {ing} {sub ? `→ try using ${sub}` : ''}
                </li>
                );
            })}
            </ul>

            <Typography variant="h6" mt={3}>Instructions:</Typography>
            <Typography>{recipe.instructions}</Typography>

            <Stack direction="row" spacing={2} mt={3}>
            <Button
            variant={isFavorite ? 'contained' : 'outlined'}
            color="secondary"
            onClick={() => dispatch(toggleFavorite(parseInt(recipe.id)))}>
            {isFavorite ? 'Remove from Favorites ❤️' : 'Save to Favorites 🤍'}
            </Button>
            
            <Button
            variant="outlined"
            color="primary"
            onClick={() => setTimeLeft(recipe.cookingTime * 60)}>
            Start Cooking Timer ⏱
            </Button>
            </Stack>

            {timeLeft !== null && (
            <Typography variant="body2" sx={{ mt: 1 }}>
                Time left: {Math.floor(timeLeft / 60)}:{String(timeLeft % 60).padStart(2, '0')} mins
            </Typography>
            )}

            {isOwner && (
            <Stack direction="row" spacing={2} mt={3}>
                <Button variant="outlined" color="primary" onClick={() => navigate(`/edit/${recipe.id}`)}>
                Edit Recipe ✏️
                </Button>
                <Button
                variant="outlined"
                color="error"
                onClick={async () => {
                    if (window.confirm("Are you sure you want to delete this recipe?")) {
                    await axios.delete(`http://localhost:3001/recipes/${recipe.id}`);
                    alert("Recipe deleted.");
                    navigate('/');
                    }
                }}>
                Delete Recipe 🗑️
                </Button>
            </Stack>
        )}
        </CardContent>
        </Card>
    );
};

export default RecipeDetails;
