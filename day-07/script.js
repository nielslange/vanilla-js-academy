// Get textarea field
const text = document.querySelector( '#text' );

// Get character count element
const count = document.querySelector( '#character-count' );

// Calculate number of characters
function countCharacters() {
	//  Add numer of character to count element
	count.textContent = this.value.length;
}

// Listen to input event
text.addEventListener( 'input', countCharacters );
