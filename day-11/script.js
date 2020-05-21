// Get textarea field.
const text = document.querySelector('#text');

// Get #word-count element.
const wordCount = document.querySelector('#word-count');

// Get #character-count element.
const characterCount = document.querySelector('#character-count');

// Get aria-live element
const ariaLive = document.querySelector('[aria-live="polite"]');

/**
 * Calculate number of words.
 *
 * @param   {Object} textarea The content of the textarea.
 * @returns {Number}          The number of words.
 */
function countWords(textarea) {
  return textarea.value.split(/[\n\r\s]+/g).filter( e => e.trim() != '' ).length;
}

/**
 * Calculate number of characters.
 *
 * @param   {Object} textarea The content of the textarea.
 * @returns {Number}          The number of characters.
 */
 function countCharacters(textarea) {
  return textarea.value.length;
}

/**
 * Update the #word-count and #character-count elements.
 *
 * @returns void
 */
function count() {
	
	// Get words count.
	let wordsCount = countWords(this);

	// Get words label.
	let wordsLabel = wordsCount == 1 ? 'word' : 'words';

	// Get characters count.
	let charactersCount = countCharacters(this);
	
	// Get characters label.
	let charactersLabel = charactersCount == 1 ? 'character' : 'characters';

	// Update the #word-count element.
	wordCount.textContent = wordsCount;

	// Update the #character-count element.
	characterCount.textContent = charactersCount;

	// Update the aria-live element.
	ariaLive.textContent = `You have written ${wordsCount} ${wordsLabel} and ${charactersCount} ${charactersLabel}.`;
}

// Listen to input event.
text.addEventListener( 'input', count );
