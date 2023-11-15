import React from 'react';
import { AppBar, Toolbar, Typography, Button, Box } from '@mui/material';
import Dropdown from './Dropdown';

const Header = ({ selectedStateId, setSelectedStateId, setIsAuthenticated }) => {
    const handleLogout = () => {
        setIsAuthenticated(false);
        localStorage.removeItem('token');
    };
  return (
    <AppBar position="static">
      <Toolbar>
        {/* Left side: Dropdown */}
        <Box flexGrow={1}>
          <Dropdown selectedStateId={selectedStateId} setSelectedStateId={setSelectedStateId} />
        </Box>

        {/* Center: App Name */}
        <Typography variant="h6" component="div" sx={{ flexGrow: 1, textAlign: 'center' }}>
          Geo Explorer App
        </Typography>

        {/* Right side: Login/Logout button */}
        <Button color="inherit" onClick={handleLogout}>
            Logout
          </Button>
        
      </Toolbar>
    </AppBar>
  );
};

export default Header;
