// Define field elements.
const fields = [ 'name', 'address', 'email', 'more' ];

// Define button element.
const save = document.querySelector( 'button' );

// Define storage ID.
const storageID = 'form';

/**
 * Get element
 *
 * @param {string} id The ID of the element.
 * @return {string} The corresponding element.
 */
function getElement( id ) {
	return document.querySelector( `#${ id }` );
}

/**
 * Load fields
 */
function loadFields() {
	let data = localStorage.getItem( storageID );

	if ( data ) {
		data = JSON.parse( data );
		fields.forEach( ( field ) => {
			getElement( field ).value = data[ field ];
		} );
	}
}

/**
 * Save fields
 */
function saveFields() {
	const name = DOMPurify.sanitize( getElement( 'name' ).value );
	const address = DOMPurify.sanitize( getElement( 'address' ).value );
	const email = DOMPurify.sanitize( getElement( 'email' ).value );
	const more = DOMPurify.sanitize( getElement( 'more' ).value );
	const data = {
		name: name,
		address: address,
		email: email,
		more: more,
	};

	localStorage.setItem( storageID, JSON.stringify( data ) );
}

/**
 * Empty fields
 */
function emptyFields() {
	fields.forEach( ( field ) => ( getElement( field ).value = '' ) );
}

/**
 * Clear storage
 */
function clearStorage() {
	localStorage.clear();
}

/**
 * Clear form
 */
function resetForm() {
	clearStorage();
	emptyFields();
}

// Listen to all input events and save the values of all fields in one entry.
document.addEventListener( 'input', saveFields );

// Listen to all click events and clear the storage and empty the fields.
save.addEventListener( 'click', resetForm );

// Load all field values when page gets loaded.
loadFields();
