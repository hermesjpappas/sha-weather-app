let requestFront = "https://api.openweathermap.org/data/2.5/weather?q=";
let requestBack = "&appid=a0fea6cd1c37ef074fec6088abfdb5fb";

async function getWeather(city) {
  let response = await fetch(requestFront + city + requestBack);
  let result = await response.json();

  console.log(result);
}

getWeather("Athens");
