import React, { useState } from 'react';
import { TextField, Button, Box } from '@mui/material';
import AuthService from '../../services/AuthService';

const SignUp = ({setIsAuthenticated}) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSignUp = async () => {
    const { success, message } = await AuthService.register(username, password);

    if (success) {
      // Handle successful sign-up (e.g., redirect to login page)
      setIsAuthenticated(true)
    } else {
      setError(message);
    }
  };

  return (
    <Box component="form" noValidate sx={{ mt: 1 }}>
      <TextField
        margin="normal"
        required
        fullWidth
        label="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <TextField
        margin="normal"
        required
        fullWidth
        label="Password"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <Button onClick={handleSignUp} fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
        Sign Up
      </Button>
    </Box>
  );
};

export default SignUp;
