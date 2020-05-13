// Get password input field
const password = document.querySelector('#password');

// Get show/hide password icon
const toggle = document.querySelector('#show-password-btn');

// Calculate visibility
function togglePassword() {
	console.log(this.className);
	if (this.className == 'hidden') {
		password.type = 'text';
		this.className = 'visible';
	} else {
		password.type = 'password';
		this.className = 'hidden';
	}
}

// 
toggle.addEventListener( 'click', togglePassword );