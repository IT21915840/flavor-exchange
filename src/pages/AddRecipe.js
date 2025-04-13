import React, { useState } from 'react';
import {
  TextField,
  Button,
  Typography,
  Box,
  Stack,
} from '@mui/material';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const AddRecipe = () => {
  const [form, setForm] = useState({
    title: '',
    ingredients: '',
    instructions: '',
    image: '',
    cookingTime: '',
    rating: '',
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    const newRecipe = {
      ...form,
      ingredients: form.ingredients.split(',').map(i => i.trim()),
      cookingTime: parseInt(form.cookingTime),
      rating: parseFloat(form.rating),
      owner: JSON.parse(localStorage.getItem('user'))?.username || "anonymous"
    };
  
    try {
      await axios.post('http://localhost:3001/recipes', newRecipe);
      alert('Recipe added!');
      navigate('/');
    } catch (error) {
      console.error('Error adding recipe:', error);
    }
  };
  

  return (
    <Box sx={{ maxWidth: 600, mx: 'auto', mt: 4 }}>
      <Typography variant="h4" gutterBottom>Add New Recipe</Typography>
      <form onSubmit={handleSubmit}>
        <Stack spacing={2}>
          <TextField name="title" label="Title" fullWidth required value={form.title} onChange={handleChange} />
          <TextField name="ingredients" label="Ingredients (comma separated)" fullWidth required value={form.ingredients} onChange={handleChange} />
          <TextField name="instructions" label="Instructions" fullWidth required multiline rows={4} value={form.instructions} onChange={handleChange} />
          <TextField name="image" label="Image URL" fullWidth value={form.image} onChange={handleChange} />
          <TextField name="cookingTime" label="Cooking Time (minutes)" fullWidth required type="number" value={form.cookingTime} onChange={handleChange} />
          <TextField name="rating" label="Rating (1-5)" fullWidth type="number" inputProps={{ step: 0.1 }} value={form.rating} onChange={handleChange} />
          <Button type="submit" variant="contained">Add Recipe</Button>
        </Stack>
      </form>
    </Box>
  );
};

export default AddRecipe;
