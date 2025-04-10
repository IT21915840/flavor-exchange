// src/redux/userSlice.js
import { createSlice } from '@reduxjs/toolkit';

const savedUser = JSON.parse(localStorage.getItem('user'));

const initialState = {
  isAuthenticated: !!savedUser,
  user: savedUser,
  favorites: JSON.parse(localStorage.getItem('favorites')) || [],
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    login(state, action) {
      state.isAuthenticated = true;
      state.user = action.payload;
      localStorage.setItem('user', JSON.stringify(action.payload));
    },
    logout(state) {
      state.isAuthenticated = false;
      state.user = null;
      state.favorites = [];
      localStorage.removeItem('user');
      localStorage.removeItem('favorites');
    },
    toggleFavorite(state, action) {
      const recipeId = action.payload;
      if (state.favorites.includes(recipeId)) {
        state.favorites = state.favorites.filter(id => id !== recipeId);
      } else {
        state.favorites.push(recipeId);
      }
      localStorage.setItem('favorites', JSON.stringify(state.favorites));
    },
  },
});

export const { login, logout, toggleFavorite } = userSlice.actions;
export default userSlice.reducer;
