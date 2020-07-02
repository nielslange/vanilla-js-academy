( function () {
	// Define endpoint.
	const endpoint = 'https://vanillajsacademy.com/api/pirates.json';

	// Define app element.
	const app = document.querySelector( '#app' );

	/**
	 * Handle response
	 *
	 * @param {Object} response The response object.
	 * @return {Object} The JSON on success or rejected Promise on failure.
	 */
	function handleResponse( response ) {
		return response.ok ? response.json() : Promise.reject( response );
	}

	/**
	 * Handle data
	 *
	 * @param {Object} response The response object.
	 */
	function handleNews( response ) {
		const articles = response.articles;
		let data = '';

		// Loop through articles and add them to a temporary variable.
		articles.forEach( ( article ) => {
			data += `<details>
				<summary>${ article.title }</summary>
				<p>${ article.article }</p>
			</details>`;
		} );

		// Create object to save articles and timestamp.
		const storage = {
			data: data,
			timestamp: new Date().getTime(),
		};

		// Save articles to local storage.
		localStorage.setItem( 'news', JSON.stringify( storage ) );

		// Add articles to DOM.
		app.innerHTML = data;
	}

	/**
	 * Handle error
	 *
	 * @param {Object} error The error object.
	 */
	function handleError( error ) {
		console.log( error );
	}

	/**
	 * Fetch API call
	 */
	function fetchNews() {
		fetch( endpoint )
			.then( handleResponse )
			.then( handleNews )
			.catch( handleError );
	}

	/**
	 * Get news
	 */
	function loadNews() {
		let news = localStorage.getItem( 'news' );
		const timestamp = new Date().getTime() - 1000 * 60 * 3;

		if ( news ) {
			news = JSON.parse( news );

			if ( timestamp < news.timestamp ) {
				app.innerHTML = news.data;
			} else {
				fetchNews();
			}
		}
	}

	// Add news to DOM from locale storage or via API call.
	loadNews();
} )();
