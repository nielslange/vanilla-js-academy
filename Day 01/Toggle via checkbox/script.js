// Get password input field
const password = document.querySelector( '#password' );

// Get show password checkbox
const toggle = document.querySelector( '#show-password' );

// Define function to toogle visibility of password
function togglePassword() {
	password.type = this.checked ? 'text' : 'password';
}

// Add event listener to password checkbox
toggle.addEventListener( 'click', togglePassword );