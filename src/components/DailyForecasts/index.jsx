import React from 'react';
import { useSelector } from 'react-redux';

import Card from '../Card';

import { ConvertNumToDay } from '../../assets/ConvertNumToDay';

const DailyForecasts = ({ degreeType }) => {
  const { dailyForecasts } = useSelector((state) => state.weather);

  return (
    <div style={{ display: 'flex', justifyContent: 'center', gap: '10px' }}>
      {dailyForecasts &&
        dailyForecasts.length &&
        dailyForecasts?.map((day) => {
          const { Date: currentDate, Temperature } = day;
          return (
            <Card
              key={currentDate}
              day={ConvertNumToDay(currentDate)}
              degrees={Temperature?.Minimum.Value}
              degreeType={degreeType}
            />
          );
        })}
    </div>
  );
};

export default DailyForecasts;
