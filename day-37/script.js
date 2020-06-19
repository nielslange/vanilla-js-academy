function displayWeather(options) {

	const defaults = {
		selector: '#app',
		units: 'M', // M - [DEFAULT] Metric (Celcius, m/s, mm) |  S - Scientific (Kelvin, m/s, mm) | I - Fahrenheit (F, mph, in)
		message: `{icon} There {verb} <strong>{desc}</strong> with <strong>{temp}</strong> in <strong>{city}</strong>.`,
		icon: true
	}

	let settings = Object.assign(defaults, options);

	// Get the app container.
	const app = document.querySelector( settings.selector );

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
		const endpoint = `${ url }?lat=${ lat }&lon=${ lon }&key=${ key }&units=${ settings.units }`;

		return fetch( endpoint );
	}

	/**
	 * Get weather data, replace message placeholder and add weather data to DOM.
	 *
	 * @param {Object} response The response Object.
	 */
	function getWhether( response ) {
		const data = response.data[ 0 ];
		const code = DOMPurify.sanitize( data.weather.icon );
		const desc = DOMPurify.sanitize( data.weather.description );
		const icon = settings.icon ? `<img src="images/${ code }.png" alt="${ desc }"><br>` : '';
		const temp = getTemperature( parseFloat( data.app_temp) );
		const city = DOMPurify.sanitize( data.city_name );
		const verb = desc.includes( 'clouds' ) ? 'are' : 'is';
		let message = settings.message.replace('{icon}', icon)
																	.replace('{verb}', verb)
																	.replace('{desc}', desc)
																	.replace('{temp}', temp)
																	.replace('{city}', city);

		// Add weather information to DOM.
		app.innerHTML = message;

		// Make copyright container visible.
		copyright.classList.remove('d-none');
	}

	/**
	 * Get temperature.
	 *
	 * @param {string} temp The temperature without units.
	 * @return {string} The temperature with units.
	 */
	function getTemperature( temp ) {
		switch ( settings.units ) {
			case 'I': return `${ temp }°F`;
			case 'S': return `${ temp }°K`;
			default:  return `${ temp }°C`;
		}
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
}

// Display weather with default settings.
displayWeather();

// Display weather with temperature in Fahrenheit.
displayWeather({
	selector: '#app2',
	units: 'I',
});

// Display weather with temperature in Kelvin.
displayWeather({
	selector: '#app3',
	units: 'S',
});

// Display weather with temperature in Fahrenheit without icon.
displayWeather({
	selector: '#app4',
	units: 'S',
	icon: false
});

// Display weather with custom message.
displayWeather({
	selector: '#app5',
	icon: false,
	message: `<strong>{city}</strong>: {temp}`,
});