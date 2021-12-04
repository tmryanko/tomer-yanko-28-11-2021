import React from 'react';
import { useSelector } from 'react-redux';
import Card from '../../components/Card';
import { FavoritesContainer } from './style';
const Favorites = () => {
  const { favoritesList } = useSelector((state) => state.favorites);
  const { degreeType } = useSelector((state) => state.weather);
  return Object.keys(favoritesList).length === 0 ? (
    <div>no favorites</div>
  ) : (
    <FavoritesContainer>
      <div>Favorites Cities</div>
      {Object.entries(favoritesList).map((fav) => {
        return (
          <Card
            key={`fav: ${fav[0]}`}
            day={fav[0]}
            degrees={fav[1][0].Temperature[degreeType].Value}
          />
        );
      })}
    </FavoritesContainer>
  );
};

export default Favorites;
