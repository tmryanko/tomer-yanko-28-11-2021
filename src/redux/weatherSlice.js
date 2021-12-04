import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
// import { ApiCall } from '../assets/fetch';

export const fetchSearchedList = createAsyncThunk(
  'home/fetchSearchedValue',
  async (state, thunkAPI) => {
    // const response = await ApiCall(
    //   `/locations/v1/cities/autocomplete?apikey=${process.env.REACT_APP_WEATHER_KEY}&q=${state}`,
    // );
    // return response.data;
  },
);
export const fetchWeatherByCityKey = createAsyncThunk(
  'home/fetchSearchedValue',
  async (state, thunkAPI) => {
    // await Promise.all([
    //   ApiCall(
    //     `/forecasts/v1/daily/5day/${key}?apikey=${process.env.REACT_APP_WEATHER_KEY}`,
    //   ).then((response) => setSearchedList(response)),
    //   fetch(
    //     `${WEATHER_LINK}/forecasts/v1/daily/5day/${key}?apikey=${process.env.REACT_APP_WEATHER_KEY}`,
    //   )
    //     .then((response) => response.json())
    //     .then((data) => setDailyForecasts(data.DailyForecasts)),
    //   //   ApiCall(
    //   //     `/currentconditions/v1/${key}?apikey=${process.env.REACT_APP_WEATHER_KEY}`,
    //   //   ).then((response) => setCurrentWeather(response)),
    //   fetch(
    //     `${WEATHER_LINK}/currentconditions/v1/${key}?apikey=${process.env.REACT_APP_WEATHER_KEY}`,
    //   )
    //     .then((response) => response.json())
    //     .then((data) => setCurrentWeather(data)),
    // ]);
  },
);

const initialState = {
  searchedList: [],
  degreeType: 'Imperial',
  dailyForecasts: [
    {
      Date: '2021-12-01T07:00:00+02:00',
      Temperature: {
        Maximum: { Value: 71, Unit: 'F', UnitType: 18 },
        Minimum: { Value: 65, Unit: 'F', UnitType: 18 },
      },
    },
    {
      Date: '2021-12-02T07:00:00+02:00',
      Temperature: {
        Maximum: { Value: 71, Unit: 'F', UnitType: 18 },
        Minimum: { Value: 65, Unit: 'F', UnitType: 18 },
      },
    },
  ],
  currentWeather: [
    {
      Temperature: {
        Imperial: { Value: 71, Unit: 'F', UnitType: 18 },
        Metric: { Value: 21.9, Unit: 'C', UnitType: 17 },
      },
      WeatherText: 'Clouds and sun',
    },
  ],
};

export const weatherSlice = createSlice({
  name: 'home',
  initialState,
  reducers: {
    changeDegreeType: (state, action) => {
      state.degreeType = action.payload;
    },
    loading(state, action) {
      // Use a "state machine" approach for loading state instead of booleans
      if (state.loading === 'idle') {
        state.loading = 'pending';
      }
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchSearchedList.fulfilled, (state, action) => {
      // Add user to the state array
      state.searchedList = action.payload;
    });
  },
});

export const { changeDegreeType } = weatherSlice.actions;

export default weatherSlice.reducer;
