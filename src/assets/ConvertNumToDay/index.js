import { DAYS } from '../days';
export const ConvertNumToDay = (currentDate) => {
  const dateToDay = new Date(currentDate);

  const day = DAYS[dateToDay.getDay()];

  return day;
};
