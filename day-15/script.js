// Get blockquote element.
const blockquote = document.querySelector('blockquote > p');

// Get button element.
const button = document.querySelector('button');

// Define the API URL.
const url = 'https://ron-swanson-quotes.herokuapp.com/v2/quotes';

// Define empty array for quotes.
const quotes = [];

// Define number of unique consecutive quotes.
const unique_quotes = 50;

// Get JSON response 
function getJSON(response) {
	return response.ok ? response.json() : Promise.reject(response);
}

// Add random quote to blockquote element.
function showQuote(data) {
	blockquote.textContent = getUniqueQuote(data);
}

// Return unique quote.
function getUniqueQuote(data) {
	// Get current quote.
	const quote = data[0];

	// If current quote is in array, get a new quote.
	if (quotes.includes(quote)) {
		fetchQuote();
	}

	// If array has 50 quotes, remove the first quote.
	if (quotes.length === unique_quotes) {
		quotes.shift();
	}

	// Add the new quote to the array.
	quotes.push(quote);
	
	// Return the quote
	return quote;
}

// Show error message.
function showError(error) {
  blockquote.parentNode.outerHTML = (
		`<div class="alert alert-danger" role="alert">
			Sorry, there was a problem getting your
			Ron Swanson quote! Please try again later.
		</div>`
  );
}

// Fetch a random Ron Swanson quote.
function fetchQuote() {
	fetch(url)
	.then(getJSON)
	.then(showQuote)
	.catch(showError);
}

// Listen to button click.
button.addEventListener('click', fetchQuote);

// Fetch quote when page is fully loaded.
fetchQuote();