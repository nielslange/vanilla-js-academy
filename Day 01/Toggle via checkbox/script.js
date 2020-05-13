/* Final solution */

const password = document.querySelector('#password');
const toggle = document.querySelector('#show-password');

function togglePassword() {
	password.type = this.checked ? 'text' : 'password';
}

toggle.addEventListener( 'click', togglePassword );

/* First solution */

// document.querySelector('#show-password').addEventListener('change', () => {
// 	let field = document.querySelector('#password');
// 	field.type == 'password' ? field.setAttribute('type','text') : field.setAttribute('type','password');
// });