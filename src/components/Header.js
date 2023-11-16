import React from 'react';
import { AppBar, Toolbar, Typography, Button, Box, Container } from '@mui/material';
import Dropdown from './Dropdown';

const Header = ({ selectedStateId, setSelectedStateId, setIsAuthenticated }) => {
  const handleLogout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem('token');
  };

  return (
    <AppBar position="static" style={{ backgroundColor: '#365092' }}>
      <Container maxWidth="lg">
        <Toolbar>
        <Box sx={{ marginLeft: '20px' }}>
            <Dropdown selectedStateId={selectedStateId} setSelectedStateId={setSelectedStateId} />
          </Box>
          <Typography variant="h5" component="div" sx={{ flexGrow: 1, textAlign: 'center' }}>
            Geo Explorer
          </Typography>
          <Box>
            <Button color="inherit" onClick={handleLogout}>
              Logout
            </Button>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Header;
