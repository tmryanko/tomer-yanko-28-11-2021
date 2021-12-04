import React from 'react';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import FavoriteBorder from '@mui/icons-material/FavoriteBorder';
import Favorite from '@mui/icons-material/Favorite';

const FavoriteCheckbox = ({ label, checked, handleChange }) => {
  return (
    <FormGroup>
      <FormControlLabel
        control={
          <Checkbox
            checked={checked}
            onChange={handleChange}
            icon={<FavoriteBorder />}
            checkedIcon={<Favorite />}
          />
        }
        label={label}
      />
    </FormGroup>
  );
};

export default FavoriteCheckbox;
