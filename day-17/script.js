// Get news container.
const app = document.querySelector('#app');

// Get copyright container.
const copyright = document.querySelector('#copyright');

// Get local API key.
const api_key = NYT_API_KEY;

// Define API endpoint.
const endpoint = `https://api.nytimes.com/svc/topstories/v2/home.json?api-key=${api_key}`;

// Define number of news items.
const news_items = 15;

/**
 * Get JSON
 *
 * @param {Object} response The response object
 * @returns {Mixed} The response JSON on success or the Promise object on failure
 */
function getJSON(response) {
	return response.ok ? response.json() : Promise.reject(response);
}

/**
 * Get news
 *
 * @param {Object} response The response object
 * @returns void
 */
function getNews(response) {
	app.innerHTML = response.results.slice(0, news_items).map( result => {
		return `
			<details>
				<summary>${result.title}</summary>
				<p class="alert alert-info my-3">${result.abstract}</p>
				<p class="my-3"><a href="${result.url}">🔎 Read the full article</a></p>
			</details>	
		`;
	}).join('');

	return response;
}

/**
 * Get copyright
 *
 * @param {Object} response The response object
 * @returns void
 */
 function getCopyright(response) {
	copyright.innerHTML = `<div class="my-3 text-muted">${response.copyright}</div>`;
}

/**
 * Get error
 *
 * @param {Object} error The error object
 * @returns void
 */
function getError(error) {
	app.innerHTML = (
		`<div class="alert alert-danger" role="alert">
			Sorry, there was a problem fetching the
			latest news from The New York Times.
		</div>
		<div class="alert alert-info" role="alert">
			You can access the latest news manually on 
			<a href="https://www.nytimes.com/">their website</a>.
		</div>`
	);
}

/**
 * Show news
 *
 * @returns void
 */
function showNews() {
	fetch(endpoint)			// Fetch enpoint.
	.then(getJSON)			// Get JSON or Promise rejection object.
	.then(getNews)			// Get and print news items.
	.then(getCopyright)	// Get and print the copyright.
	.catch(getError);		// Catch and print error message.
}

// Load news once if page is fully loaded.
showNews();