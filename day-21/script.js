// Get news container.
const app = document.querySelector( '#app' );

// Get copyright container.
const copyright = document.querySelector( '#copyright' );

// Get local API key.
const api_key = 'LGpkjcYgDceynVLZCYf7yAGQJ6L1KyID';

// Define API endpoint.
const endpoint = `https://api.nytimes.com/svc/topstories/v2/home.json?api-key=${ api_key }`;

// Define empty array for news items.
let news_items = [];

// Define amount of news items per section.
const news_items_amount = 100;

// Define empty array for news sections.
const news_sections = [];

// Define amount of news sections.
const news_sections_amount = 100;

/**
 * Humanize news items
 *
 * @param {String} string The original string.
 * @returns The humanized string.
 */
function humanize( string ) {
	return string.replace( /trump/gim, '🤡' );
}

/**
 * Get JSON
 *
 * @param {Object} response The response object
 * @returns {Mixed} The response JSON on success or the Promise object on failure
 */
function getJSON( response ) {
	return response.ok ? response.json() : Promise.reject( response );
}

/**
 * Sort items
 *
 * @param {Object} items The unsorted items
 * @returns {Object} The sorted items
 */
function sortItems( items ) {
	return items.sort( ( a, b ) => a.section.localeCompare( b.section ) );
}

/**
 * Count items
 *
 * @param {Object} items The items object
 * @param {String} section The section name
 * @returns {Integer} The count of items per section
 */
function countItems( items, section ) {
	return items.filter( ( element ) => {
		return element.section == section;
	} ).length;
}

/**
 * Filter items
 *
 * @param {Object} items The unfiltered items.
 * @returns {Object} The filtered items.
 */
function filterItems( items ) {
	items.forEach( ( element ) => {
		// Define section name
		let section = element.section;

		// Return if element hasn't been added to the sections array yet, but the
		// section array already has the number of sections as defined in `news_sections_amount`
		if (
			! news_sections.includes( section ) &&
			news_sections.length == news_sections_amount
		) {
			return;
		}

		// Add element to the section array, if it hasn't been added yet
		if ( ! news_sections.includes( section ) )
			news_sections.push( section );

		// Add element to the news array, if the corresponding section does not
		// already have the number of news items as defined in `news_items_amount`
		if ( countItems( news_items, section ) < news_items_amount )
			news_items.push( element );
	} );

	return sortItems( news_items );
}

/**
 * Get news
 *
 * @param {Object} response The response object
 * @returns void
 */
function getNews( response ) {
	// Define headline element.
	let headline = '';

	// Define news element.
	let news = '';

	// Get filtered news items.
	filterItems( response.results ).forEach( ( element ) => {
		// Add unique section names to news element.
		if ( element.section != headline ) {
			news += `<h2 class="my-3 h4">${ element.section }</h2>`;
		}

		// Add news content to news container.
		news += `
			<details>
				<summary>${ element.title }</summary>
				<p class="alert alert-info my-3">${ element.abstract }</p>
				<p class="my-3"><a href="${ element.url }">🔎 Read the full article</a></p>
			</details>	
		`;

		// Set current section name as next headline element.
		headline = element.section;
	} );

	// Sanitize news and add it to DOM.
	app.innerHTML = DOMPurify.sanitize( humanize( news ) );

	return response;
}

/**
 * Get copyright
 *
 * @param {Object} response The response object
 * @returns void
 */
function getCopyright( response ) {
	copyright.innerHTML = DOMPurify.sanitize(
		humanize( `<div class="my-3 text-muted">${ response.copyright }</div>` )
	);
}

/**
 * Get error
 *
 * @param {Object} error The error object
 * @returns void
 */
function getError( error ) {
	app.innerHTML = `<div class="alert alert-danger" role="alert">
			Sorry, there was a problem fetching the
			latest news from The New York Times.
		</div>
		<div class="alert alert-info" role="alert">
			You can access the latest news manually on 
			<a href="https://www.nytimes.com/">their website</a>.
		</div>`;
}

/**
 * Show news
 *
 * @returns void
 */
function showNews() {
	fetch( endpoint ) // Fetch enpoint.
		.then( getJSON ) // Get JSON or Promise rejection object.
		.then( getNews ) // Get and print news items.
		.then( getCopyright ) // Get and print the copyright.
		.catch( getError ); // Catch and print error message.
}

// Load news once if page is fully loaded.
showNews();
