import React from 'react';
import MuiAutocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';

const Autocomplete = ({
  id,
  options,
  handleChange,
  handleInputChange,
  darkTheme,
}) => {
  const loading = options?.length === 0;

  return (
    <MuiAutocomplete
      options={options}
      onChange={(event, newValue) => {
        handleChange(newValue);
      }}
      onInputChange={(event, newInputValue) => {
        handleInputChange(event, newInputValue);
      }}
      freeSolo
      disablePortal
      id={id}
      loading={loading}
      getOptionLabel={(option) => option?.LocalizedName || ''}
      sx={{
        width: 300,
        background: darkTheme ? '#121212' : '#fff',
      }}
      renderOption={(props, option) => {
        return (
          <li {...props} key={option?.Key}>
            {option?.LocalizedName}
          </li>
        );
      }}
      renderInput={(params) => {
        return <TextField {...params} label='Pick City' />;
      }}
    />
  );
};

export default Autocomplete;
