/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-expressions */
import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import {
  addToFavorites,
  removeFromFavorites,
} from '../../redux/favoritesSlice';
import Typography from '@mui/material/Typography';
import FavoriteCheckbox from '../../components/FavoriteCheckbox';
import { HomeContainer, HomeBody } from './style';
import Autocomplete from '../../components/Autocomplete';
import {
  fetchSearchedList,
  fetchWeatherByCityKey,
  setErrorMsg,
  fetchCurrentPosition,
  setCurrentCity,
} from '../../redux/weatherSlice';
import Snackbar from '@mui/material/Snackbar';

import DailyForecasts from '../../components/DailyForecasts';

const Home = ({ darkTheme }) => {
  const dispatch = useDispatch();
  const [errorAlert, setErrorAlert] = React.useState(false);
  let location = useLocation();

  const { favoritesList } = useSelector((state) => state.favorites);
  const {
    currentWeather,
    searchedList,
    degreeType,
    currentCity,
    error,
  } = useSelector((state) => state.weather);
  const [checked, setChecked] = useState(false);
  // const [searchedValue, setSearchedValue] = useState();
  // {
  // AdministrativeArea: { ID: 'TA', LocalizedName: 'Tel Aviv' },
  // Country: { ID: 'IL', LocalizedName: 'Israel' },
  // Key: '215854',
  // LocalizedName: 'Tel Aviv',
  // Rank: 31,
  // Type: 'City',
  // Version: 1,
  // }
  const [inputValue, setInputValue] = useState('');
  useEffect(() => {
    if (error) setErrorAlert(true);
  }, [error]);

  useEffect(() => {
    if (location.state) {
      console.log(location.state);
      dispatch(
        setCurrentCity({
          Key: location.state.Key,
          LocalizedName: location.state.city,
        }),
      );
      dispatch(fetchWeatherByCityKey(location.state));
    }
    if ('geolocation' in navigator && !location.state) {
      navigator.geolocation.getCurrentPosition(function (position) {
        dispatch(
          fetchCurrentPosition({
            lat: position.coords.latitude,
            lan: position.coords.longitude,
          }),
        );
      });
    } else {
      console.log('Not Available');
    }
  }, []);

  useEffect(() => {
    const handler = setTimeout(() => {
      if (inputValue) dispatch(fetchSearchedList(inputValue));
    }, 1000);
    return () => {
      clearTimeout(handler);
    };
  }, [inputValue]);

  // useEffect(() => {
  //   if (currentCity) {
  //     const { Key } = currentCity;
  //     console.log(currentCity);

  //     dispatch(fetchWeatherByCityKey(Key));
  //   }
  // }, [currentCity]);

  useEffect(() => {
    if (currentCity?.Key && !location.state) {
      console.log(currentCity);
      dispatch(fetchWeatherByCityKey(currentCity?.Key));
    }
  }, [currentCity]);

  useEffect(() => {
    if (favoritesList[currentCity?.CityName]) setChecked(true);
    else setChecked(false);
  }, [currentCity]);

  const handleFavoritesChange = () => {
    const { CityName, Key } = currentCity;
    if (!checked) {
      dispatch(addToFavorites({ CityName, currentWeather, Key }));
    } else {
      dispatch(removeFromFavorites(CityName));
    }
    setChecked(!checked);
  };
  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    dispatch(setErrorMsg(''));
    setErrorAlert(false);
  };
  return (
    <HomeContainer>
      <Snackbar
        open={errorAlert}
        onClose={handleClose}
        autoHideDuration={3000}
        severity='error'
        message={error}
      />

      <Autocomplete
        darkTheme={darkTheme}
        options={searchedList}
        handleChange={(newValue) => {
          dispatch(setCurrentCity(newValue));
          // setSearchedValue(newValue);
        }}
        handleInputChange={(newInputValue, e) => {
          var english = /^[A-Za-z0-9]*$/;
          if (english.test(newInputValue)) setInputValue(newInputValue);
          else {
            dispatch(setErrorMsg('only english'));
          }
        }}
        id='home-Autocomplete'
      />
      <HomeBody>
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-around',
            flexWrap: 'wrap',
          }}
        >
          <div>
            <Typography sx={{ minWidth: 200 }}>
              {currentCity?.CityName}
            </Typography>
            <Typography>
              {currentWeather[0]?.Temperature?.[degreeType].Value}&nbsp;
              {currentWeather[0]?.Temperature?.[degreeType].Unit}
            </Typography>
          </div>
          <div>
            {currentCity && (
              <FavoriteCheckbox
                handleChange={handleFavoritesChange}
                checked={checked}
                label='Add To Favorites'
                darkTheme={darkTheme}
              />
            )}
          </div>
        </div>
        <Typography variant='h4'>{currentWeather[0]?.WeatherText}</Typography>
        <DailyForecasts degreeType={degreeType} />
      </HomeBody>
    </HomeContainer>
  );
};

export default Home;
