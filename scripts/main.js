let requestFront = "https://api.openweathermap.org/data/2.5/weather?q=";
let requestBack = "&appid=a0fea6cd1c37ef074fec6088abfdb5fb";

async function getWeatherData(city) {
  let response = await fetch(requestFront + city + requestBack);
  let data = await response.json();

  console.log(data);

  return data;
}

getWeatherData("Athens");
