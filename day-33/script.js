/** 
 * Create and run IFFE (Immediately Invoked Function Expression) 
 * 
 * @see https://developer.mozilla.org/en-US/docs/Glossary/IIFE
*/
;( () => {

	// Get all second level headings.
	const headlines = Array.prototype.slice.call(document.querySelectorAll('h2'));

	// Get the table of contents container.
	const toc = document.querySelector('#table-of-contents');

	// Loop through second level headings
	const items = headlines.map( headline => {
	
		// Add missing IDs.
		if ( ! headline.id ) {
			headline.id = headline.innerText.toLowerCase().replace(/[^a-z0-9]+/g, '-');
		}

		// Wrap headings links with list items.
		return `<li><a href="#${headline.id}">${headline.innerText}</a></li>`;
		
	} ).join('');

	// Wrap heading list items with unordered list and add list to DOM.
	toc.innerHTML = `<ul>${items}</ul>`;
		
} ) ();