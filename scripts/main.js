let requestFront = "https://api.openweathermap.org/data/2.5/weather?q=";
let requestBack = "&units=metric&appid=a0fea6cd1c37ef074fec6088abfdb5fb";

let cityInput = document.getElementById('city');
let weatherButton = document.getElementById('weather');
let cont = document.getElementById('weather-cont');

function cToF(temp) {
  temp = parseFloat(temp);
  return (temp * 9/5 + 32);
}

async function getWeatherData(city) {
    let response = await fetch(requestFront + city + requestBack);
    let data = await response.json();
    console.log(data);
    return data;
}

getWeatherData("Athens");

function displayWeatherData(data) {
  // console.log(data.name, '- Temperature:', Math.round(data.main.temp),
  // 'C / Weather:',data.weather[0].description);
  cont.innerHTML = "";
  cont.style.justifyContent = "flex-start";

  //display the city name
  let cityTitle = document.createElement('h1');
  cityTitle.textContent = `${data.name}, ${data.sys.country}`
  cont.appendChild(cityTitle);

  //display weather icon
  let iconId = data.weather[0].icon;
  let iconImg = document.createElement("img");
  iconImg.src = "images/" + iconId + ".png";
  cont.appendChild(iconImg);

  //display temperature
  let temp = data.main.temp.toFixed(1);
  let fTemp = cToF(temp).toFixed(1);
  let tempDisplay = document.createElement('p');
  tempDisplay.innerHTML = '<strong>Temperature: </strong>' + temp + '°C / ' + fTemp+ '°F';
  cont.appendChild(tempDisplay);

  //display 'feels like'
  let feels = data.main.feels_like.toFixed(1);
  let fFeels = cToF(feels).toFixed(1);
  let feelsDisplay = document.createElement('p');
  feelsDisplay.innerHTML = '<strong>Feels like:</strong> ' + feels + '°C / ' + fFeels+ '°F';
  cont.appendChild(feelsDisplay);

  //display weather description
  let weather = data.weather[0].description;
  let weatherDisplay = document.createElement('p');
  weatherDisplay.innerHTML = '<strong>Weather: </strong>' + weather;
  cont.appendChild(weatherDisplay);

  //display humidity
  let humidity = data.main.humidity;
  let humidityDisplay = document.createElement('p');
  humidityDisplay.innerHTML = '<strong>Humidity: </strong>' + humidity + '%';
  cont.appendChild(humidityDisplay);



}

function displayError(err) {
  cont.innerHTML = "";
  cont.style.justifyContent = 'center';
  let errorMsg = document.createElement('p');
  errorMsg.textContent = 'Error / City Not Found';
  errorMsg.style.backgroundColor = 'red';
  errorMsg.style.color = 'white';
  errorMsg.style.fontWeight = 'bold';
  cont.appendChild(errorMsg);
}

function makeRequest() {
  let city = cityInput.value.replace(/ /g, '');
  console.log(city);
  if(city === '') return;
  return getWeatherData(city)
  .then(data => displayWeatherData(data))
  .catch(err => displayError(err));
}

getWeatherData('Athens').then(data => displayWeatherData(data))

weatherButton.addEventListener("click", makeRequest);


// let athensData = getWeatherData('Athens');
// athensData.then(data => displayWeatherData(data));

// let glyfadaData = getWeatherData('Glyfada');
// glyfadaData.then(data => displayWeatherData(data));