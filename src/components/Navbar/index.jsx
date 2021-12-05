import React from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { changeDegreeType } from '../../redux/weatherSlice';
import AppBar from '@mui/material/AppBar';
import Container from '@mui/material/Container';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Tooltip from '@mui/material/Tooltip';
import IconButton from '@mui/material/IconButton';
import ThermostatIcon from '@mui/icons-material/Thermostat';
import InvertColorsIcon from '@mui/icons-material/InvertColors';

const Navbar = ({ onClickIconColor }) => {
  const dispatch = useDispatch();
  const { degreeType } = useSelector((state) => state.weather);
  const handleChangeDegreeType = () => {
    if (degreeType === 'Metric') {
      dispatch(changeDegreeType('Imperial'));
    } else {
      dispatch(changeDegreeType('Metric'));
    }
  };
  // const handleChangeTheme = () => {
  //   console.log('object');
  // };

  return (
    <AppBar position='static'>
      <Container>
        <Toolbar sx={{ justifyContent: 'space-between' }}>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Typography>The Weather</Typography>
            <Tooltip title='cel\fhar'>
              <IconButton
                aria-label='cel\fhar'
                onClick={handleChangeDegreeType}
              >
                <ThermostatIcon />
              </IconButton>
            </Tooltip>
            <Tooltip placement='right' title='change theme'>
              <IconButton aria-label='change theme' onClick={onClickIconColor}>
                <InvertColorsIcon />
              </IconButton>
            </Tooltip>
          </Box>
          <Box sx={{ display: 'flex', gap: '10px' }}>
            <Link style={{ color: 'white', textDecoration: 'none' }} to='/'>
              Home
            </Link>

            <Link
              style={{ color: 'white', textDecoration: 'none' }}
              to='/favorites'
            >
              favorites
            </Link>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Navbar;
