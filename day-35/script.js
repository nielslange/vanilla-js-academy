// Get the app container.
const app = document.querySelector( '#app' );

// Get the form container.
const form = document.querySelector( '[data-info="form"]' );

// Get the copyright container.
const copyright = document.querySelector( '[data-info="copyright"]' );

// Get the location API endpoint.
const locationAPIEndpoint = 'https://ipapi.co/json/';

// Get the weather API endpoint.
const weatherAPIEndpoint = 'https://api.weatherbit.io/v2.0/current';

// Get the weather API key.
const weatherAPIKey = 'f092496926424fe2ab42684f5b967c70';

/**
 * Get JSON data.
 *
 * @param {Object} response The response Object.
 * @return {Object} The JSON data on success or the Promise rejection on failure.
 */
function getJSON( response ) {
	return response.ok ? response.json() : Promise.reject( response );
}

/**
 * Get location data.
 *
 * @param {Object} response The response Object.
 * @return {Object} The weather fetch Object.
 */
function getLocation( response ) {
	const lat = parseFloat( response.latitude );
	const lon = parseFloat( response.longitude );
	const url = weatherAPIEndpoint;
	const key = weatherAPIKey;
	const endpoint = `${ url }?lat=${ lat }&lon=${ lon }&key=${ key }`;

	return fetch( endpoint );
}

/**
 * Get weather data, add it to DOM and toggle visibility of form and copyright container.
 *
 * @param {Object} response The response Object.
 */
function getWhether( response ) {
	const data = response.data[ 0 ];
	const code = DOMPurify.sanitize( data.weather.icon );
	const desc = DOMPurify.sanitize( data.weather.description );
	const icon = `<img src="images/${ code }.png" alt="${ desc }"><br>`;
	const temp = getTemperature( parseFloat( data.app_temp) );
	const city = DOMPurify.sanitize( data.city_name );
	const verb = desc.includes( 'clouds' ) ? 'are' : 'is';

	// Add weather information to DOM.
	app.innerHTML = `
		${ icon } There ${ verb } <strong>${ desc.toLowerCase() }</strong> with 
		<strong>${ temp }</strong> in <strong>${ city }</strong>.
	`;

	// Make form container visible.
	form.classList.remove('d-none');

	// Make copyright container visible.
	copyright.classList.remove('d-none');
}

/**
 * Get temperature.
 *
 * @param {string} temp The original temperature.
 * @return {string} The updated temperature.
 */
function getTemperature( temp ) {
	const radio = document.querySelector( '#fahrenheit' );
	const f = c2f( temp ).toFixed( 1 );
	const c = temp.toFixed( 1 );

	return radio.checked ? `${ f }°F` : `${ c }°C`;
}

/**
 * Convert Celcius to Fahrenheit.
 *
 * @param {string} temp The original temperature.
 * @return {string} The updated temperature.
 */
function c2f( temp ) {
	return temp * 1.8 + 32;
}

/**
 * Convert Fahrenheit to Celcius.
 *
 * @param {string} temp The original temperature.
 * @return {string} The updated temperature.
 */
function f2c( temp ) {
	return ( temp - 32 ) / 1.8;
}

/**
 * Return error message to the console.
 *
 * @param {Object} error The error object.
 */
function getError( error ) {
	console.error( error );
}

/**
 * Fetch location first and weather information second.
 */
function render() {
	fetch( locationAPIEndpoint )
		.then( getJSON )
		.then( getLocation )
		.then( getJSON )
		.then( getWhether )
		.catch( getError );
}

// Display the weather information if the page is fully loaded.
render();

// Listen for temperature scale change event.
window.addEventListener( 'change', ( event ) => {
	if ( event.target.classList.contains( 'form-check-input' ) ) render();
} );
