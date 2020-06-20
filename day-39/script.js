/**
 * Helper library
 *
 * @return { Object } Helper methods.
 */
const _ = ( () => {
	// Define ethods object.
	const methods = {};

	// Convert a NodeList to an array.
	methods.toArray = ( nodelist ) => [ ...nodelist ];

	// Get the first matching element in the DOM.
	methods.get = ( element ) => document.querySelector( element );

	// Get all matching elements in the DOM as an array.
	methods.getAll = ( element ) => {
		return methods.toArray( document.querySelectorAll( element ) );
	};

	// Add a class to all elements in an array.
	methods.addClass = ( array, className ) => {
		array.forEach( ( element ) => element.classList.add( className ) );
	};

	// Remove a class from all elements in an array.
	methods.removeClass = ( array, className ) => {
		array.forEach( ( element ) => element.classList.remove( className ) );
	};

	// Return methods.
	return methods;
} )();

// TEST 1: Convert a NodeList to an array.
const nodelist = document.querySelectorAll( 'button' );
console.log( { nodelist } );
const array = _.toArray( nodelist );
console.log( { array } );

// TEST 2: Get the first matching element in the DOM.
const first = _.get( 'button' );
console.log( { first } );

// TEST 3: Get all matching elements in the DOM as an array.
const all = _.getAll( 'button' );
console.log( { all } );

// TEST 4: Add a class to all elements in an array.
_.addClass( array, 'btn-danger' );

// TEST 5: Remove a class from all elements in an array.
_.removeClass( array, 'btn-primary' );
