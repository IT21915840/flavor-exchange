// src/redux/recipeSlice.js
import { createSlice } from '@reduxjs/toolkit';

const recipeSlice = createSlice({
  name: 'recipes',
  initialState: {
    items: [],
    loading: false,
    error: null,
  },
  reducers: {
    setRecipes(state, action) {
      state.items = action.payload;
    },
    addRecipe(state, action) {
      state.items.push(action.payload);
    },
    updateRecipe(state, action) {
      const index = state.items.findIndex(r => r.id === action.payload.id);
      if (index !== -1) {
        state.items[index] = action.payload;
      }
    },
    deleteRecipe(state, action) {
      state.items = state.items.filter(r => r.id !== action.payload);
    },
  },
});

export const { setRecipes, addRecipe, updateRecipe, deleteRecipe } = recipeSlice.actions;
export default recipeSlice.reducer;
