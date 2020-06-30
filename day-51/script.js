// Get form elements.
const form = document.querySelector( '#save-me' ).elements;

// Get save button element.
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
		for ( let i = 0; i < data.length; i++ ) {
			if (
				data[ i ].type == 'text' ||
				data[ i ].type == 'email' ||
				data[ i ].type == 'textarea' ||
				data[ i ].type == 'select-one'
			) {
				getElement( data[ i ].id ).value = data[ i ].value;
			} else if (
				data[ i ].type == 'radio' ||
				data[ i ].type == 'checkbox'
			) {
				getElement( data[ i ].id ).checked = data[ i ].checked;
			}
		}
	}
}

/**
 * Save fields
 */
function saveFields() {
	let data = [];
	const form = getElement( 'save-me' ).elements;

	for ( let i = 0; i < form.length; i++ ) {
		if (
			form[ i ].type == 'text' ||
			form[ i ].type == 'email' ||
			form[ i ].type == 'textarea' ||
			form[ i ].type == 'select-one'
		) {
			data.push( {
				id: form[ i ].id,
				type: form[ i ].type,
				value: DOMPurify.sanitize( form[ i ].value ),
			} );
		} else if (
			form[ i ].type == 'radio' ||
			form[ i ].type == 'checkbox'
		) {
			data.push( {
				id: form[ i ].id,
				type: form[ i ].type,
				checked: Boolean( form[ i ].checked ),
			} );
		}
	}

	localStorage.setItem( storageID, JSON.stringify( data ) );
}

/**
 * Empty fields
 */
function emptyFields() {
	for ( let i = 0; i < form.length; i++ ) {
		form[ i ].value = '';
	}
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
