export const ApiCall = async (link, body) => {
  const WEATHER_LINK = 'https://dataservice.accuweather.com';
  const res = await fetch(`${WEATHER_LINK}${link}`);
  const json = await res.json();

  // .then((response) => response.json())
  // .then((data) => return data;
  return json;
};
