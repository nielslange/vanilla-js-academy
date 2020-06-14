// Get all second level headings.
const headlines = Array.prototype.slice.call(
	document.querySelectorAll( 'h2' )
);

// Get the table of contents container.
const tableOfContents = document.querySelector( '#table-of-contents' );

/**
 * Add missing IDs
 *
 *  @returns void
 */
function addMissingIDs() {
	// Loop though headlines.
	headlines.forEach( ( headline ) => {
		// Get headline ID, if exists.
		const id = headline.getAttribute( 'id' );

		// Get headline text.
		const title = headline.innerText.toLowerCase();

		// Add ID if the element does not have one yet.
		if ( null === id ) {
			// Replace spaces and quotes with dashes while avoiding double dashes.
			headline.setAttribute(
				'id',
				title.replace( /\s|'/g, '-' ).replace( /--/g, '-' )
			);
		}
	} );
}

/**
 * Get headlines.
 *
 * @returns {String} The headlines as link within an unordered list.
 */
function getTOC() {
	// Add all missing IDs.
	addMissingIDs();

	// Wrap headline links with list items.
	const items = headlines
		.map(
			( element ) => `
		<li>
			<a href="#${ element.id }" title="Jump to the section ${ element.innerText }">${ element.innerText }</a>
		</li>
	`
		)
		.join( '' );

	// Wrap the list items with an unordered list.
	const list = `<ul class="my-4">${ items }</ul>`;

	// Return TOC as unordered list.
	return list;
}

/**
 * Render table of contents.
 *
 * @returns void;
 */
function render() {
	// Add TOC to DOM, if second level headings exist.
	if ( headlines ) {
		tableOfContents.innerHTML = getTOC();
	}
}

// Render the table of contents.
render();
