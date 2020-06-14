// Define password toggle
function toggle( state, elements ) {
	// Loop though all password fields
	elements.forEach( ( item ) => {
		// Toogle the input type
		item.type = state == true ? 'text' : 'password';
	} );
}

// Add event listener to all click events
document.addEventListener( 'click', ( event ) => {
	// Process if event matches "#show-password" and "#show-passwords"
	if (
		event.target.matches( '#show-password' ) ||
		event.target.matches( '#show-passwords' )
	) {
		// Get state of "Show passwords" checkbox
		let state = event.target.checked;

		// Get password field(s) of corresponding form
		let elements = Array.prototype.slice.call(
			event.target.parentNode.parentNode.querySelectorAll(
				'.field-password'
			)
		);

		// Toggle visibility of password field(s)
		toggle( state, elements );
	}
} );
