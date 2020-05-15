// Define password toggle 
function toggle( state, elements ) {
	elements.forEach( item => { item.type = state == true ? 'text' : 'password'; } );
}

// Listen to all click events
document.addEventListener( 'click', event => {

	// Process sign up and change password forms
	if ( event.target.matches( '#show-password' ) || event.target.matches( '#show-passwords' ) ) {
		
		// Get state of "Show passwords" checkbox
		let state = event.target.checked;
		
		// Get password field(s) of corresponding form
		let elements = Array.prototype.slice.call( event.target.parentNode.parentNode.querySelectorAll( '.field-password' ) );

		// Toggle visibility of password field(s)
		toggle( state, elements );
	}

} );