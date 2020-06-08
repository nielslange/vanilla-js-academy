// Get all second level headings.
const headlines = Array.prototype.slice.call(document.querySelectorAll('h2'));

// get teh table of contents container.
const tableOfContents = document.querySelector('#table-of-contents');

/**
 * Get headlines.
 *
 * @returns {String} The headlines as link within an unordered list.
 */
function getTableOfContents() {
	const items = headlines.map(element => 
		`<li>
			<a href="#${element.id}" title="Jump to the section ${element.innerText}">${element.innerText}</a>
		</li>`
	).join('');

	return `<ul class="my-4">${items}</ul>`;
}

/**
 * Render table of contents.
 *
 * @returns void;
 */
function render() {
	tableOfContents.innerHTML = getTableOfContents();
}

// Call the render() function when the site is fully loaded.
render();