import styled from 'styled-components';

export const DailyForecastsCont = styled.div`
  display: flex;
  justify-content: center;
  grid-gap: 10px;
  @media (max-width: 768px) {
    flex-wrap: wrap;
  }
`;
