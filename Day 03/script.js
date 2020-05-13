// Get all password input fields
const passwords = Array.prototype.slice.call(document.querySelectorAll('[type="password"]'));

// Get show/hide passwords toggle
const toggle = document.querySelector('#show-password');

// Define show/hide passwords function
function togglePasswords() {
	passwords.forEach( (item, index) => {
		console.log(item.type);
		item.type = this.checked ? 'text' : 'password';
	} )
}

// Add event listener to show/hide passwords toggle
toggle.addEventListener( 'click', togglePasswords );