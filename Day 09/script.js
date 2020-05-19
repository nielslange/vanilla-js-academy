// Get textarea field
const text = document.querySelector('#text');

// Get #word-count element
const wordCount = document.querySelector('#word-count');

// Get #character-count element
const characterCount = document.querySelector('#character-count');

// Calculate number of words and characters
function countWordsAndCharacters() {
	
	//  Add numer of words to #word-count element
	wordCount.textContent = this.value.split(' ').filter( e => e.trim() != '' ).length;
	
	//  Add numer of character to #character-count element
	characterCount.textContent = this.value.length;
}

// Listen to input event
text.addEventListener( 'input', countWordsAndCharacters );