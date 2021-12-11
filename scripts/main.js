let requestFront = 'https://api.openweathermap.org/data/2.5/weather?q=';
let requestBack = '&appid=a0fea6cd1c37ef074fec6088abfdb5fb';

let getWeather = async () => {
let response = await fetch(requestFront + 'Athens,GR' + requestBack);
let result = await response.json();

console.log(result);

}

getWeather();