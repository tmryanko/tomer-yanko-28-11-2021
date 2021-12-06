import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Card from '../../components/Card';
import Typography from '@mui/material/Typography';
import { FavoritesContainer, ListContainer } from './style';

const Favorites = () => {
  const navigate = useNavigate();
  const { favoritesList } = useSelector((state) => state.favorites);
  const { degreeType } = useSelector((state) => state.weather);

  const handleCardClick = (key, city) => {
    navigate('/', { state: { key, city } });
  };

  return Object.keys(favoritesList).length === 0 ? (
    <FavoritesContainer>
      <Typography variant='h3'>no favorites</Typography>
    </FavoritesContainer>
  ) : (
    <FavoritesContainer>
      <Typography variant='h3'>Favorite Cities</Typography>
      <ListContainer>
        {Object.entries(favoritesList).map((fav) => {
          const date = new Date(
            fav[1].currentWeather[0]?.LocalObservationDateTime,
          ).toLocaleDateString();
          return (
            <Card
              onClick={() => handleCardClick(fav[1].Key, fav[0])}
              key={`fav: ${fav[0]}`}
              cardHeaderTitle={fav[0]}
              cardHeaderSubTitle={date}
              degrees={fav[1].currentWeather[0]?.Temperature.Imperial.Value}
              unit={fav[1].currentWeather[0]?.Temperature?.[degreeType].Unit}
              degreeType={degreeType}
            />
          );
        })}
      </ListContainer>
    </FavoritesContainer>
  );
};

export default Favorites;
