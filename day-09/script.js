// Get textarea field.
const text = document.querySelector( '#text' );

// Get #word-count element.
const wordCount = document.querySelector( '#word-count' );

// Get #character-count element.
const characterCount = document.querySelector( '#character-count' );

/**
 * Calculate number of words.
 *
 * @param   {Object} textarea The content of the textarea.
 * @returns {Number}          The number of words.
 */
function countWords( textarea ) {
	return textarea.value
		.split( /[\n\r\s]+/g )
		.filter( ( e ) => e.trim() != '' ).length;
}

/**
 * Calculate number of characters.
 *
 * @param   {Object} textarea The content of the textarea.
 * @returns {Number}          The number of characters.
 */
function countCharacters( textarea ) {
	return textarea.value.length;
}

/**
 * Update the #word-count and #character-count elements.
 *
 * @returns void
 */
function count() {
	//  Update the #word-count element.
	wordCount.textContent = countWords( this );

	//  Update the #character-count element.
	characterCount.textContent = countCharacters( this );
}

// Listen to input event.
text.addEventListener( 'input', count );
