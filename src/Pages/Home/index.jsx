/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-expressions */
import React, { useState, useEffect } from 'react';
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
  changeDegreeType,
} from '../../redux/weatherSlice';
import DailyForecasts from '../../components/DailyForecasts';

const Home = () => {
  const dispatch = useDispatch();
  const { favoritesList } = useSelector((state) => state.favorites);
  const { currentWeather, searchedList, degreeType } = useSelector(
    (state) => state.weather,
  );
  const [checked, setChecked] = useState(false);
  const [searchedValue, setSearchedValue] = useState({
    AdministrativeArea: { ID: 'TA', LocalizedName: 'Tel Aviv' },
    Country: { ID: 'IL', LocalizedName: 'Israel' },
    Key: '215854',
    LocalizedName: 'Tel Aviv',
    Rank: 31,
    Type: 'City',
    Version: 1,
  });
  const [inputValue, setInputValue] = useState('');

  useEffect(() => {
    const handler = setTimeout(() => {
      if (inputValue) dispatch(fetchSearchedList(inputValue));
    }, 1000);
    return () => {
      clearTimeout(handler);
    };
  }, [inputValue]);

  useEffect(() => {
    if (searchedValue && inputValue) {
      const { Key } = searchedValue;
      dispatch(fetchWeatherByCityKey(Key));
    }
  }, [searchedValue]);

  useEffect(() => {
    if (favoritesList[searchedValue?.LocalizedName]) setChecked(true);
  }, [favoritesList]);

  const handleFavoritesChange = () => {
    const { LocalizedName } = searchedValue;
    if (!checked) {
      dispatch(addToFavorites({ LocalizedName, currentWeather }));
    } else {
      dispatch(removeFromFavorites(searchedValue?.LocalizedName));
    }
    setChecked(!checked);
  };

  const handleChangeDegreeType = () => {
    if (degreeType === 'Metric') {
      dispatch(changeDegreeType('Imperial'));
    } else {
      dispatch(changeDegreeType('Metric'));
    }
  };

  return (
    <HomeContainer>
      <button onClick={handleChangeDegreeType}>dd</button>
      <Autocomplete
        options={searchedList}
        handleChange={(newValue) => {
          setSearchedValue(newValue);
        }}
        handleInputChange={(newInputValue) => {
          setInputValue(newInputValue);
        }}
        id='home-Autocomplete'
      />
      <HomeBody>
        <div style={{ display: 'flex', justifyContent: 'space-around' }}>
          <div>
            <Typography>{searchedValue?.LocalizedName}</Typography>
            <Typography>
              {currentWeather[0]?.Temperature?.[degreeType].Value}
            </Typography>
          </div>
          <div>
            <FavoriteCheckbox
              handleChange={handleFavoritesChange}
              checked={checked}
              label='Add To Favorites'
            />
          </div>
        </div>
        <Typography variant='h4'>{currentWeather[0]?.WeatherText}</Typography>
        <DailyForecasts degreeType={degreeType} />
      </HomeBody>
    </HomeContainer>
  );
};

export default Home;
