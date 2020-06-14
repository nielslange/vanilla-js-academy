// Get password input field
const password = document.querySelector( '#password' );

// Get show password icon
const icon = document.querySelector( '#btn-toggle-password' );

// Define function to toogle visibility of password
function togglePassword() {
	// Set data attribute and input type
	if ( this.dataset.visibility == 'hidden' ) {
		password.type = 'text';
		this.dataset.visibility = 'visible';
	} else {
		password.type = 'password';
		this.dataset.visibility = 'hidden';
	}
}

// Add event listener to password icon
icon.addEventListener( 'click', togglePassword );
