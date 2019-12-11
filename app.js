/* eslint-disable no-unused-vars */
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
const error = document.getElementById('error');

// API FETCH & DISTRUCTURING
const fetchAPI = async () => {
  // declare api keys and url
  const openWatherApiKey = '743190f3c54b8ac7de8e661b70b7d5f5';
  const openWeatherApi = `https://api.openweathermap.org/data/2.5/weather?q=${citySearch.value},${countrySearch.value}&appid=${openWatherApiKey}`;
  const googleKey = 'AIzaSyArrLQkX1yaLUGhufF8Ic9UuE2kgWH89Bc';
  // openWeather call
  const openWeatherResponse = await fetch(openWeatherApi);
  const openWeatherdata = await openWeatherResponse.json();

  if (openWeatherdata.cod === '404') {
    const { message } = openWeatherdata;

    error.innerHTML = `<h2 id = 'error' >${message}. try again </h2>`;
    responseDiv.removeAttribute('visibility');
    citySearch.value = '';
    countrySearch.value = '';
  } else {
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
    const { lon, lat } = openWeatherdata.coord;
    city.textContent = name;
    country.textContent = count;
    weather.textContent = description;
    temperature.textContent = temp;
    pressure.textContent = pres;
    humidity.textContent = hum;
    wind.textContent = speed;

    // remove error message
    error.innerHTML = ``;

    // map image
    mapDiv.innerHTML = `<img class="map cell" src="https://maps.googleapis.com/maps/api/staticmap?center=${lat},${lon}&markers=color:purple%7*label:C%7C${lat},${lon}&zoom=12&size=600x400&key=${googleKey}" alt="map" />`;
    // show result in DOM

    responseDiv.removeAttribute('visibility');
    responseDiv.style.visibility = 'visible';
    citySearch.value = '';
    countrySearch.value = '';

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
  }
};
// Fetch and display data in dom
const fetchData = async () => {
  await fetchAPI();
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
