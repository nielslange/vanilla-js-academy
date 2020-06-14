// Get the app container.
const app = document.querySelector('#app');

// Get the location API endpoint.
const location_api_endpoint = 'https://ipapi.co/json/';

// Get the weather API endpoint.
const weather_api_endpoint = 'https://api.weatherbit.io/v2.0/current';

// Get the weather API key.
const weather_api_key = 'f092496926424fe2ab42684f5b967c70';

function getJSON(response) {
	return response.ok ? response.json() : Promise.reject(response);
}

function getLocation(response) {
	
	const lat = response.latitude;
	const lon = response.longitude;
	const url = weather_api_endpoint;
	const key = weather_api_key;
	const endpoint = `${url}?lat=${lat}&lon=${lon}&key=${key}`;

	return fetch(endpoint);

}

function getWhether(response) {

	const data = response.data[0];
	const code = data.weather.icon;
	const icon = `<img src="images/${code}.png"><br>`;
	const temp = data.app_temp;
	const city = data.city_name;

	app.innerHTML = `${icon} It is currently ${temp}°C in ${city}.`;

	console.table(icon);
	console.table(response);
}

function getError(error) {
	console.error(error);
}

function showweather() {
	fetch(location_api_endpoint)
	.then(getJSON)
	.then(getLocation)
	.then(getJSON)
	.then(getWhether)
	.catch(getError);
}

console.log('Show the weather.');

showweather();