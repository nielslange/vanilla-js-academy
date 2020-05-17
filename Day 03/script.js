// Get all password input fields
const passwords = Array.prototype.slice.call( 
	document.querySelectorAll( '[type="password"]' ) 
);

// Get show password checkbox
const toggle = document.querySelector('#show-password');

// Define function to toogle visibility of password
function togglePasswords() {
	// Loop though all password fields and toogle their input types
	passwords.forEach( item => {
		item.type = this.checked ? 'text' : 'password';
	} )
}

// Add event listener to password checkbox
toggle.addEventListener( 'click', togglePasswords );