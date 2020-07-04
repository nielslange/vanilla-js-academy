( function () {
	// Define app element.
	const app = document.querySelector( '#app' );
	
	/**
	 * Dynamically vary the API endpoint
	 * @return {String} The API endpoint
	 */
	function getEndpoint() {
		const endpoint = 'https://vanillajsacademy.com/api/';
		const random = Math.random();
		if (random < 0.5) return endpoint + 'pirates.json';
		return endpoint + 'fail.json';
	};

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
		loadNews( false );
	}
	
	/**
	 * Fetch API call
	 console.log( error );
	 */
	function fetchNews() {
		fetch( getEndpoint() )
		.then( handleResponse )
		.then( handleNews )
		.catch( handleError );
	}

	/**
	 * Get news
	 */
	function loadNews( microseconds = 1000 ) {
		let news = localStorage.getItem( 'news' );
		const timestamp = new Date().getTime() - microseconds;

		if ( news ) {
			news = JSON.parse( news );
			
			if ( ! microseconds ) {
				app.innerHTML = news.data;
			} else if ( timestamp < news.timestamp ) {
				app.innerHTML = news.data;
			} else {
				fetchNews();
			}
		}
	}

	// Add news to DOM from locale storage or via API call.
	loadNews();
} )();
