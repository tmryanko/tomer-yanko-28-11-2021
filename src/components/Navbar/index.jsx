import React from 'react';
import { Link } from 'react-router-dom';
import AppBar from '@mui/material/AppBar';
import Container from '@mui/material/Container';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

const Navbar = () => {
  return (
    <AppBar position='static'>
      <Container>
        <Toolbar sx={{ justifyContent: 'space-between' }}>
          <Typography>the weather king</Typography>
          <Box sx={{ display: 'flex', gap: '10px' }}>
            <Link to='/'>Home</Link>
            <Link to='/favorites'>favorites</Link>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Navbar;
