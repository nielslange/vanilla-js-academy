// Get the app container.
const app = document.querySelector('#app');

// Get the location API endpoint.
const location_api_endpoint = 'https://ipapi.co/json/';

// Get the weather API endpoint.
const weather_api_endpoint = 'https://api.weatherbit.io/v2.0/current';

// Get the weather API key.
const weather_api_key = 'f092496926424fe2ab42684f5b967c70';

/**
 * Get JSON data.
 * 
 * @param {object} response The response object.
 * @return The JSON data on success or the Promise rejection on failure.
 */
function getJSON(response) {
	return response.ok ? response.json() : Promise.reject(response);
}

/**
 * Get location data.
 * 
 * @param {object} response The response object.
 * @return The weather fetch object.
 */
function getLocation(response) {
	
	const lat = response.latitude;
	const lon = response.longitude;
	const url = weather_api_endpoint;
	const key = weather_api_key;
	const endpoint = `${url}?lat=${lat}&lon=${lon}&key=${key}`;

	return fetch(endpoint);

}

/**
 * Get weather data and add information to DOM.
 * 
 * @param {object} response The response object.
 * @return void
 */
function getWhether(response) {

console.log(response);

	const data = response.data[0];
	const code = data.weather.icon;
	const desc = data.weather.description;
	const icon = `<img src="images/${code}.png" alt="${desc}"><br>`;
	const temp = data.app_temp;
	const city = data.city_name;

	app.innerHTML = `${icon} There is <strong>${desc.toLowerCase()}</strong> with <strong>${temp}°C</strong> in <strong>${city}</strong>.`;

}

/**
 * Return error message to the console.
 * 
 * @return void
 */
function getError(error) {
	console.error(error);
}

/**
 * Fetch location first and weather information second.
 * 
 * @return void
 */
function render() {
	fetch(location_api_endpoint)
	.then(getJSON)
	.then(getLocation)
	.then(getJSON)
	.then(getWhether)
	.catch(getError);
}

// Display the weather information if the page is fully loaded.
render();