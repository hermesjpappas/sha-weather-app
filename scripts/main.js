let requestFront = "https://api.openweathermap.org/data/2.5/weather?q=";
let requestBack = "&units=metric&appid=a0fea6cd1c37ef074fec6088abfdb5fb";

let cityInput = document.getElementById('city');
let weatherButton = document.getElementById('weather');
let cont = document.getElementById('weather-cont');

async function getWeatherData(city) {

  try {
    let response = await fetch(requestFront + city + requestBack);
    let data = await response.json();
    console.log(data);
    return data;
  }

  catch (e) {
    console.log(e);
    return 'Error';
  }
}

getWeatherData("Athens");

function displayWeatherData(data) {
  // console.log(data.name, '- Temperature:', Math.round(data.main.temp),
  // 'C / Weather:',data.weather[0].description);
  cont.innerHTML = "";
  cont.style.justifyContent = "flex-start";

  let cityTitle = document.createElement('h1');
  cityTitle.textContent = data.name;
  cont.appendChild(cityTitle);

  let iconId = data.weather[0].icon;
  let iconImg = document.createElement("img");
  iconImg.src = "http://openweathermap.org/img/wn/" + iconId + "@2x.png";
  cont.appendChild(iconImg);

}

function displayError(err) {
  cont.innerHTML = "";
  cont.style.justifyContent = 'center';
  let errorMsg = document.createElement('p');
  errorMsg.textContent = 'Error / City Not Found';
  errorMsg.style.color = 'red';
  errorMsg.style.fontWeight = 'bold';
  cont.appendChild(errorMsg);
}

function makeRequest() {
  return getWeatherData(cityInput.value)
  .then(data => displayWeatherData(data))
  .catch(err => displayError(err));
}


weatherButton.addEventListener("click", makeRequest);


// let athensData = getWeatherData('Athens');
// athensData.then(data => displayWeatherData(data));

// let glyfadaData = getWeatherData('Glyfada');
// glyfadaData.then(data => displayWeatherData(data));