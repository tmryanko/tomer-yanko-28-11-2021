import styled from 'styled-components';

export const FavoritesContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin: 20px;
  grid-gap: 20px;
`;

export const ListContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  grid-gap: 20px;
  @media (max-width: 768px) {
    flex-wrap: wrap;
  }
`;
