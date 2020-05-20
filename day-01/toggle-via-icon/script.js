// Get password input field
const password = document.querySelector( '#password' );

// Get show password icon
const icon = document.querySelector( '#btn-toggle-password' );

// Define function to toogle visibility of password
function togglePassword() {
	// Get attribute "data-visibility"
	const visibility = this.dataset.visibility;

	// Set data attribute and input type
	if ( visibility == 'hidden' ) {
		password.type = 'text';
		visibility = 'visible';
	} else {
		password.type = 'password';
		visibility = 'hidden';
	}
}

// Add event listener to password icon
icon.addEventListener( 'click', togglePassword );