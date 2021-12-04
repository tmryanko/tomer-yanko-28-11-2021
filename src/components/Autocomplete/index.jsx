import React from 'react';
import MuiAutocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';

const Autocomplete = ({ id, options, handleChange, handleInputChange }) => {
  const loading = options.length === 0;

  return (
    <MuiAutocomplete
      options={options}
      onChange={(event, newValue) => {
        handleChange(newValue);
      }}
      onInputChange={(event, newInputValue) => {
        handleInputChange(newInputValue);
      }}
      freeSolo
      disablePortal
      id={id}
      loading={loading}
      getOptionLabel={(option) => option?.LocalizedName || ''}
      sx={{
        width: 300,
      }}
      renderInput={(params) => {
        return <TextField {...params} label='Pick City' />;
      }}
    />
  );
};

export default Autocomplete;
