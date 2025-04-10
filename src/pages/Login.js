// src/pages/Login.js
import React, { useState } from 'react';
import {
  Box, TextField, Button, Typography
} from '@mui/material';
import { useDispatch } from 'react-redux';
import { login } from '../redux/userSlice';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [username, setUsername] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogin = () => {
    if (username.trim()) {
      dispatch(login({ username }));
      navigate('/');
    }
  };

  return (
    <Box sx={{ maxWidth: 400, mx: 'auto', mt: 6 }}>
      <Typography variant="h4" gutterBottom>Login</Typography>
      <TextField
        label="Username"
        fullWidth
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        margin="normal"
      />
      <Button variant="contained" onClick={handleLogin}>Login</Button>
    </Box>
  );
};

export default Login;
