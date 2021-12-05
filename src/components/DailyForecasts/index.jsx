import React from 'react';
import { useSelector } from 'react-redux';
import Typography from '@mui/material/Typography';

import Card from '../Card';
import { ConvertNumToDay } from '../../assets/ConvertNumToDay';
import { DailyForecastsCont } from './style';

const DailyForecasts = ({ degreeType }) => {
  const { dailyForecasts } = useSelector((state) => state.weather);

  return dailyForecasts.length === 0 ? (
    <Typography>Empty List</Typography>
  ) : (
    <DailyForecastsCont
      style={{ display: 'flex', justifyContent: 'center', gap: '10px' }}
    >
      {dailyForecasts &&
        dailyForecasts.length &&
        dailyForecasts?.map((day, index) => {
          const { Date: currentDate, Temperature } = day;
          return (
            <Card
              key={currentDate}
              day={ConvertNumToDay(currentDate)}
              degrees={Temperature?.Minimum.Value}
              degreeType={degreeType}
              unit={degreeType === 'Imperial' ? 'F' : 'C'}
            />
          );
        })}
    </DailyForecastsCont>
  );
};

export default DailyForecasts;
