export const ApiCall = async (link) => {
  const WEATHER_LINK = 'http://dataservice.accuweather.com';
  const res = await fetch(`${WEATHER_LINK}${link}`);
  const json = await res.json();

  // .then((response) => response.json())
  // .then((data) => return data;
  return json;
};
