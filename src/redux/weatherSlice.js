import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { ApiCall } from '../assets/fetch';

export const fetchSearchedList = createAsyncThunk(
  'home/fetchSearchedList',
  async (state, thunkAPI) => {
    const response = await ApiCall(
      `/locations/v1/cities/autocomplete?apikey=${process.env.REACT_APP_WEATHER_KEY}&q=${state}`,
    );
    return response;
  },
);
export const fetchCurrentPosition = createAsyncThunk(
  'home/fetchCurrentPosition',
  async (state, thunkAPI) => {
    const response = await ApiCall(
      `/locations/v1/cities/geoposition/search?apikey=${process.env.REACT_APP_WEATHER_KEY}&q=${state.lat},${state.lan}`,
    );
    return response;
  },
);

export const fetchWeatherByCityKey = createAsyncThunk(
  'home/fetchWeatherByCityKey',
  async (state, thunkAPI) => {
    const res = await Promise.all([
      ApiCall(
        `/forecasts/v1/daily/5day/${state}?apikey=${process.env.REACT_APP_WEATHER_KEY}`,
      ),
      ApiCall(
        `/currentconditions/v1/${state}?apikey=${process.env.REACT_APP_WEATHER_KEY}`,
      ),
    ]);
    return res;
  },
);

const initialState = {
  error: '',
  searchedList: [],
  degreeType: 'Imperial',
  currentCity: {
    // Key: '9999',
    // CityName: 'tel aviv',
  },
  dailyForecasts: [
    // {
    //   Date: '2021-12-01T07:00:00+02:00',
    //   Temperature: {
    //     Maximum: { Value: 71, Unit: 'F', UnitType: 18 },
    //     Minimum: { Value: 65, Unit: 'F', UnitType: 18 },
    //   },
    // },
    // {
    //   Date: '2021-12-02T07:00:00+02:00',
    //   Temperature: {
    //     Maximum: { Value: 71, Unit: 'F', UnitType: 18 },
    //     Minimum: { Value: 65, Unit: 'F', UnitType: 18 },
    //   },
    // },
    // {
    //   Date: '2021-12-03T07:00:00+02:00',
    //   Temperature: {
    //     Maximum: { Value: 71, Unit: 'F', UnitType: 18 },
    //     Minimum: { Value: 65, Unit: 'F', UnitType: 18 },
    //   },
    // },
    // {
    //   Date: '2021-12-04T07:00:00+02:00',
    //   Temperature: {
    //     Maximum: { Value: 71, Unit: 'F', UnitType: 18 },
    //     Minimum: { Value: 65, Unit: 'F', UnitType: 18 },
    //   },
    // },
  ],
  currentWeather: [
    // {
    //   Temperature: {
    //     Imperial: { Value: 71, Unit: 'F', UnitType: 18 },
    //     Metric: { Value: 21.9, Unit: 'C', UnitType: 17 },
    //   },
    //   WeatherText: 'Clouds and sun',
    // },
  ],
};

export const weatherSlice = createSlice({
  name: 'home',
  initialState,
  reducers: {
    changeDegreeType: (state, action) => {
      state.degreeType = action.payload;
    },
    setCurrentCity: (state, action) => {
      state.currentCity = state.currentCity = {
        Key: action.payload.Key,
        CityName: action.payload.LocalizedName,
      };
    },
    setErrorMsg: (state, action) => {
      state.error = action.payload;
    },
    loading(state, action) {
      if (state.loading === 'idle') {
        state.loading = 'pending';
      }
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchSearchedList.fulfilled, (state, action) => {
      state.searchedList = action.payload;
    });
    builder.addCase(fetchSearchedList.rejected, (state, action) => {
      state.error = action.error.message;

      state.searchedList = [];
    });
    builder.addCase(fetchCurrentPosition.fulfilled, (state, action) => {
      state.currentCity = {
        Key: action.payload.ParentCity.Key,
        CityName: action.payload.ParentCity.LocalizedName,
      };
    });
    builder.addCase(fetchCurrentPosition.rejected, (state, action) => {
      state.error = action.error.message;
    });
    builder.addCase(fetchWeatherByCityKey.fulfilled, (state, action) => {
      action.payload.forEach((result) => {
        if (result?.DailyForecasts) {
          state.dailyForecasts = result?.DailyForecasts;
        } else {
          state.currentWeather = result;
        }
      });
      state.currentCityKey = action.payload;
    });
    builder.addCase(fetchWeatherByCityKey.rejected, (state, action) => {
      state.error = action.error.message;
    });
  },
});

export const {
  changeDegreeType,
  setErrorMsg,
  setCurrentCity,
} = weatherSlice.actions;

export default weatherSlice.reducer;
