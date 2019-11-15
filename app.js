/* eslint-disable no-undef */
const city = document.getElementById('city');
const country = document.getElementById('country');
const weather = document.getElementById('weather');
const temperature = document.getElementById('temp');
const pressure = document.getElementById('pres');
const humidity = document.getElementById('humidity');
const wind = document.getElementById('wind');
const degree = document.getElementById('degree');
const tempChange = document.getElementById('tempChange');
const mapDiv = document.getElementById('map');
const citySearch = document.getElementById('city-search');
const countrySearch = document.getElementById('country-search');
const facebookShare = document.querySelector(
  '[data-js="facebook-share"]',
);
const responseDiv = document.getElementById('response');
// API FETCH & DISTRUCTURING

// declare api keys and url

const fetchAPI = async () => {
  const openWatherAPI_KEY = '743190f3c54b8ac7de8e661b70b7d5f5';
  const openWeatherAPI = `https://api.openweathermap.org/data/2.5/weather?q=${citySearch.value},${countrySearch.value}&appid=${openWatherAPI_KEY}`;
  console.log(`${citySearch.value},${countrySearch.value}`);
  // openWeather call
  const openWeatherResponse = await fetch(openWeatherAPI);
  const openWeatherdata = await openWeatherResponse.json();
  console.log('TCL: fetchAPI -> openWeatherdata', openWeatherdata);

  // assign value
  const { name } = openWeatherdata;
  const { description } = openWeatherdata.weather[0];
  const { country: count } = openWeatherdata.sys;
  const {
    temp,
    pressure: pres,
    humidity: hum,
  } = openWeatherdata.main;
  const { speed } = openWeatherdata.wind;
  city.textContent = name;
  country.textContent = count;
  weather.textContent = description;
  temperature.textContent = temp;
  pressure.textContent = pres;
  humidity.textContent = hum;
  wind.textContent = speed;

  // formular for C/F
  const f = (temp * 9) / 5 + 32;

  tempChange.addEventListener('click', () => {
    if (degree.textContent === 'C') {
      temperature.textContent = Math.floor((f * 100) / 100);
      degree.textContent = 'F';
    } else if (degree.textContent === 'F') {
      temperature.textContent = temp;
      degree.textContent = 'C';
    }
  });
};
// Fetch and display data in dom
const fetchData = async () => {
  await fetchAPI();
  responseDiv.removeAttribute('visibility');
  responseDiv.style.visibility = 'visible';
  citySearch.value = '';
  countrySearch.value = '';
};

// Share on facebook
facebookShare.addEventListener('click', e => {
  e.preventDefault();
  const facebookWindow = window.open(
    `https://www.facebook.com/sharer/sharer.php?u=${document.URL}`,
    'facebook-popup',
    'height=300,width=600',
  );
  if (facebookWindow.focus) {
    facebookWindow.focus();
  }
  return false;
});
