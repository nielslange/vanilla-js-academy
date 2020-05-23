// Get blockquote element.
const blockquote = document.querySelector('blockquote > p');

// Get button element.
const button = document.querySelector('button');

// Fetch a random Ron Swanson quote.
function fetchQuote() {
	// Fetch a random quote from https://ron-swanson-quotes.herokuapp.com/v2/quotes
	fetch( 'https://ron-swanson-quotes.herokuapp.com/v2/quotes' ).then( response => {
		// Return quote on success or error on failure.
		return response.ok ? response.json() : Promise.reject(response);
	}).then( data => {
		// Add quopte to blockquote element.
		blockquote.textContent = data;
	}).catch( error => {
		// Catch and print error it in console.
		console.error(error);
	});
}

// Listen to button click.
button.addEventListener( 'click', fetchQuote );