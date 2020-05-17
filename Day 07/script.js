// Get text area field
const text = document.querySelector('#text');

// Get character count section
const count = document.querySelector('#character-count');

// Calculate number of characters and add numer to character count section
function countCharacters() {
	count.textContent = this.value.length;
}

// Listen to input events on text area field and call countCharacters() function
text.addEventListener( 'input', countCharacters );