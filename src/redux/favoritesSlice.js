import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  favoritesList: {},
};

export const favoritesSlice = createSlice({
  name: 'favorites',
  initialState,
  reducers: {
    addToFavorites: (state, action) => {
      const { payload } = action;
      const { CityName, currentWeather, Key } = payload;
      state.favoritesList = {
        ...state.favoritesList,
        [CityName]: { Key, currentWeather },
      };
    },
    removeFromFavorites: (state, action) => {
      delete state.favoritesList[action.payload];
    },
  },
});

export const { addToFavorites, removeFromFavorites } = favoritesSlice.actions;

export default favoritesSlice.reducer;
