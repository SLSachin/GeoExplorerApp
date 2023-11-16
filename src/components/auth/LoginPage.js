import React, { useState } from 'react';
import SignIn from './SignIn';
import SignUp from './SignUp';
import { Container, Typography, Paper, Tabs, Tab } from '@mui/material';

const LoginPage = ({setIsAuthenticated}) => {
  const [tabIndex, setTabIndex] = useState(0);

  const handleTabChange = (event, newValue) => {
    setTabIndex(newValue);
  };

  return (
    <Container component="main" maxWidth="xs">
      <Paper elevation={3} sx={{ padding: 3, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <Typography component="h1" variant="h5">
          {tabIndex === 0 ? 'Sign In' : 'Sign Up'}
        </Typography>
        <Tabs
          value={tabIndex}
          onChange={handleTabChange}
          indicatorColor="primary"
          textColor="primary"
          centered
          sx={{ marginTop: 2 }}
        >
          <Tab label="Sign In" />
          <Tab label="Sign Up" />
        </Tabs>
        {tabIndex === 0 ? <SignIn setIsAuthenticated={setIsAuthenticated}/> 
        : <SignUp setIsAuthenticated={setIsAuthenticated}/>}
      </Paper>
    </Container>
  );
};

export default LoginPage;
