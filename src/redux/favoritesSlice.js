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
      const { LocalizedName, currentWeather } = payload;
      state.favoritesList = {
        ...state.favoritesList,
        [LocalizedName]: currentWeather,
      };
    },
    removeFromFavorites: (state, action) => {
      delete state.favoritesList[action.payload];
    },
  },
});

export const { addToFavorites, removeFromFavorites } = favoritesSlice.actions;

export default favoritesSlice.reducer;
