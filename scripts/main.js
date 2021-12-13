//weather icons courtesy of Laura Reen
//https://www.iconfinder.com/laurareen

let requestFront = "https://api.openweathermap.org/data/2.5/weather?q=";
let requestBack = "&units=metric&appid=a0fea6cd1c37ef074fec6088abfdb5fb";

let cityInput = document.getElementById("city");
let weatherButton = document.getElementById("weather");
let cont = document.getElementById("weather-cont");

function cToF(temp) {
  temp = parseFloat(temp);
  return (temp * 9) / 5 + 32;
}

async function getWeatherData(city) {
  let response = await fetch(requestFront + city + requestBack);
  let data = await response.json();
  return data;
}

function displayWeatherData(data) {
  cont.innerHTML = "";
  cont.style.justifyContent = "flex-start";

  //display the city name
  let cityTitle = document.createElement("h1");
  cityTitle.textContent = `${data.name}, ${data.sys.country}`;
  cont.appendChild(cityTitle);

  //display weather icon
  let iconId = data.weather[0].icon;
  let iconImg = document.createElement("img");
  iconImg.src = "images/" + iconId + ".png";
  cont.appendChild(iconImg);

  //display temperature
  let temp = data.main.temp.toFixed(1);
  let fTemp = cToF(temp).toFixed(1);
  let tempDisplay = document.createElement("p");
  tempDisplay.innerHTML =
    "<strong>Temperature: </strong>" + temp + "°C / " + fTemp + "°F";
  cont.appendChild(tempDisplay);

  //display 'feels like'
  let feels = data.main.feels_like.toFixed(1);
  let fFeels = cToF(feels).toFixed(1);
  let feelsDisplay = document.createElement("p");
  feelsDisplay.innerHTML =
    "<strong>Feels like:</strong> " + feels + "°C / " + fFeels + "°F";
  cont.appendChild(feelsDisplay);

  //display weather description
  let weather = data.weather[0].description;
  let weatherDisplay = document.createElement("p");
  weatherDisplay.innerHTML = "<strong>Weather: </strong>" + weather;
  cont.appendChild(weatherDisplay);

  //display humidity
  let humidity = data.main.humidity;
  let humidityDisplay = document.createElement("p");
  humidityDisplay.innerHTML = "<strong>Humidity: </strong>" + humidity + "%";
  cont.appendChild(humidityDisplay);
}

function displayError(err) {
  cont.innerHTML = "";
  cont.style.justifyContent = "center";
  let errorMsg = document.createElement("p");
  errorMsg.classList.add("error");
  errorMsg.textContent = "Error / City Not Found";
  cont.appendChild(errorMsg);
}

function makeRequest() {
  if (cityInput.value === "") return;

  let output;

  if (cityInput.value.includes(",")) {
    let inputArr = cityInput.value.split(",");
    let city = inputArr[0].trim().replace(/\s\s+/g, "%20");
    let country = inputArr[1].trim();
    output = `${city},${country}`;
  }
  else {
    let city = cityInput.value.trim();
    output = city;
  }
  
  return getWeatherData(output)
    .then((data) => displayWeatherData(data))
    .catch((err) => displayError(err));
}

//run data for Athens on first run / page load
getWeatherData("Athens").then((data) => displayWeatherData(data));

//add button event listener to get new weather for different city
weatherButton.addEventListener("click", makeRequest);
