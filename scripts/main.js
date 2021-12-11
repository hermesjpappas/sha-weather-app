let requestFront = "https://api.openweathermap.org/data/2.5/weather?q=";
let requestBack = "&units=metric&appid=a0fea6cd1c37ef074fec6088abfdb5fb";

async function getWeatherData(city) {

  try {
    let response = await fetch(requestFront + city + requestBack);
    let data = await response.json();
    console.log(data);
    return data;
  }

  catch (e) {
    console.log(e);
  }
}

function displayWeatherData(data) {
  console.log(data.name, "Temperature:", Math.round(data.main.temp),"C","Weather:",data.weather[0].description);
}


let athensData = getWeatherData("Athens");
athensData.then(data => displayWeatherData(data));