import { configureStore } from '@reduxjs/toolkit';
import favoritesReducer from './favoritesSlice';
import weatherReducer from './weatherSlice';

export const store = configureStore({
  reducer: {
    favorites: favoritesReducer,
    weather: weatherReducer,
  },
});
