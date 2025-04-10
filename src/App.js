import { BrowserRouter, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import RecipeDetails from './pages/RecipeDetails';
import Login from './pages/Login';
import AddRecipe from './pages/AddRecipe';
import EditRecipe from './pages/EditRecipe';
import PrivateRoute from './components/PrivateRoute';
import FavoritesPage from './pages/FavoritesPage';

import { useDispatch, useSelector } from 'react-redux';
import { logout } from './redux/userSlice';
import { Link } from 'react-router-dom';
import { AppBar, Toolbar, Typography, Button, Box } from '@mui/material';

function App({ toggleTheme }) {
  const dispatch = useDispatch();
  const user = useSelector(state => state.user.user);
  const isAuthenticated = useSelector(state => state.user.isAuthenticated);

  return (
    <BrowserRouter>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            <Link to="/" style={{ color: 'white', textDecoration: 'none' }}>
              Flavor Exchange
            </Link>
          </Typography>

          {isAuthenticated && (
            <Button
              color="inherit"
              component={Link}
              to="/add"
              sx={{ marginRight: 2 }}
            >
              + Add Recipe
            </Button>
          )}

          {isAuthenticated && (
            <Button
              color="inherit"
              component={Link}
              to="/favorites"
              sx={{ marginRight: 2 }}
            >
              ❤️ Favorites
            </Button>
          )}

          {isAuthenticated ? (
            <>
              <Typography variant="body1" sx={{ marginRight: 2 }}>
                Hello, {user.username}
              </Typography>
              <Button color="inherit" onClick={() => dispatch(logout())}>
                Logout
              </Button>
            </>
          ) : (
            <Button color="inherit" component={Link} to="/login">
              Login
            </Button>
          )}

          <Button color="inherit" onClick={toggleTheme}>
          🌓 Toggle Theme
          </Button>
          
        </Toolbar>
      </AppBar>

      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/recipe/:id" element={<RecipeDetails />} />
        <Route path="/login" element={<Login />} />
        <Route path="/add" element={<PrivateRoute><AddRecipe /></PrivateRoute>} />
        <Route path="/edit/:id" element={<PrivateRoute><EditRecipe /></PrivateRoute>} />
        <Route path="/favorites" element={<PrivateRoute><FavoritesPage /></PrivateRoute>} />
      </Routes>
    </BrowserRouter>
  );
}
export default App;
