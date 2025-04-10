// src/pages/EditRecipe.js
import React, { useEffect, useState } from 'react';
import {
  TextField, Button, Typography, Box, Stack
} from '@mui/material';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const EditRecipe = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [form, setForm] = useState(null);

  useEffect(() => {
    axios.get(`http://localhost:3001/recipes/${id}`)
      .then(res => {
        const recipe = res.data;
        setForm({
          ...recipe,
          ingredients: recipe.ingredients.join(', '),
        });
      });
  }, [id]);

  const handleChange = (e) => {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const updated = {
      ...form,
      ingredients: form.ingredients.split(',').map(i => i.trim()),
      cookingTime: parseInt(form.cookingTime),
      rating: parseFloat(form.rating),
    };
    await axios.put(`http://localhost:3001/recipes/${id}`, updated);
    alert("Recipe updated!");
    navigate(`/recipe/${id}`);
  };

  if (!form) return <Typography>Loading...</Typography>;

  return (
    <Box sx={{ maxWidth: 600, mx: 'auto', mt: 4 }}>
      <Typography variant="h4" gutterBottom>Edit Recipe</Typography>
      <form onSubmit={handleSubmit}>
        <Stack spacing={2}>
          <TextField name="title" label="Title" fullWidth required value={form.title} onChange={handleChange} />
          <TextField name="ingredients" label="Ingredients (comma separated)" fullWidth required value={form.ingredients} onChange={handleChange} />
          <TextField name="instructions" label="Instructions" fullWidth required multiline rows={4} value={form.instructions} onChange={handleChange} />
          <TextField name="image" label="Image URL" fullWidth value={form.image} onChange={handleChange} />
          <TextField name="cookingTime" label="Cooking Time (minutes)" fullWidth required type="number" value={form.cookingTime} onChange={handleChange} />
          <TextField name="rating" label="Rating (1-5)" fullWidth type="number" inputProps={{ step: 0.1 }} value={form.rating} onChange={handleChange} />
          <Button type="submit" variant="contained">Save Changes</Button>
        </Stack>
      </form>
    </Box>
  );
};

export default EditRecipe;
