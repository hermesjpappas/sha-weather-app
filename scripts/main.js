let requestFront = "https://api.openweathermap.org/data/2.5/weather?q=";
let requestBack = "&appid=a0fea6cd1c37ef074fec6088abfdb5fb";

async function getWeatherData(city) {

  try {
    let response = await fetch(requestFront + city + requestBack);
    let data = await response.json();
    return data;
  }

  catch (e) {
    console.log(e);
  }
}

let athensData = getWeatherData("Athens");
athensData.then(data => displayWeatherData(data));



function displayWeatherData(data) {
  console.log(data.name, "Temperature:", data.main.temp,"Weather:",data.weather[0].description);
}
