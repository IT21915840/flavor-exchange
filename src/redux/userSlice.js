// src/redux/userSlice.js
import { createSlice } from '@reduxjs/toolkit';

const savedFavorites = JSON.parse(localStorage.getItem('favorites')) || [];

const initialState = {
  isAuthenticated: false,
  user: null,
  favorites: savedFavorites,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    login(state, action) {
      state.isAuthenticated = true;
      state.user = action.payload;
    },
    logout(state) {
      state.isAuthenticated = false;
      state.user = null;
      state.favorites = [];
      localStorage.removeItem('favorites');
    },
    toggleFavorite(state, action) {
      const recipeId = action.payload;
      if (state.favorites.includes(recipeId)) {
        state.favorites = state.favorites.filter(id => id !== recipeId);
      } else {
        state.favorites.push(recipeId);
      }

      // Persist updated favorites
      localStorage.setItem('favorites', JSON.stringify(state.favorites));
    },
  },
});

export const { login, logout, toggleFavorite } = userSlice.actions;
export default userSlice.reducer;
