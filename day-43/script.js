const $ = ( function() {
	// Use strict mode.
	'use strict';

	/**
	 * Convert nodelist to array
	 *
	 * @param {NodeList} nodelist The original nodelist.
	 * @return {Array} The converted array.
	 */
	const toArray = ( nodelist ) => [ ...nodelist ];

	/**
	 * Get first element of array.
	 *
	 * @return {Array} The first element of the given array.
	 */
	const first = ( array ) => array[ 0 ];

	/**
	 * Get last element of array.
	 *
	 * @return {Array} The last element of the given array.
	 */
	const last = ( array ) => array[ array.length - 1 ];

	/**
	 * Define constructor.
	 *
	 * @param {String} selector The selector of the element to use.
	 */
	const Constructor = function( selector ) {
		if ( 'document' === selector ) {
			this.elements = [ document ];
		} else if ( 'window' === selector ) {
			this.elements = [ window ];
		} else {
			this.elements = document.querySelectorAll( selector );
		}
	};

	/**
	 * Create and return an instance of the Constructor.
	 *
	 * @param {String} selector The selector of the element to use.
	 * @return {Constructor} The instance of the wanted element.
	 */
	const instance = ( selector ) => new Constructor( selector );

	/**
	 * Get an array of items from the DOM.
	 *
	 * @return {Array} The array of the wanted element(s).
	 */
	Constructor.prototype.toArray = function() {
		return toArray( this.elements );
	};

	/**
	 * Get the first and last matching items from the DOM.
	 *
	 * @return {Array} The array with the first and last matching item.
	 */
	Constructor.prototype.getFirstAndLast = function() {
		// Define empty array.
		let array = [];

		// Add first matching element to array.
		array.push( first( this.elements ) );

		// Add last matching element to array.
		array.push( last( this.elements ) );

		// Return the array with teh first and the last matching element.
		return toArray( array );
	};

	/**
	 * Add a class to all matching elements.
	 *
	 * @param {String} className The class name to add.
	 */
	Constructor.prototype.addClass = function( className ) {
		// Loop through elements and add the class name.
		this.elements.forEach( ( element ) => {
			element.classList.add( className );
		} );

		// Return the object instance.
		return this;
	};

	/**
	 * Remove a class to all matching elements.
	 *
	 * @param {String} className The class name to remove.
	 */
	Constructor.prototype.removeClass = function( className ) {
		// Loop through elements and remove the class name.
		this.elements.forEach( ( element ) => {
			element.classList.remove( className );
		} );

		// Return the object instance.
		return this;
	};

	// Return the Constructor instance.
	return instance;
} )();

/*******************************************************************************
 * START TEST CASES
 *******************************************************************************/

const doc = $( 'document' ); // Get document element.
console.log( { doc } ); // Log document element.

const win = $( 'window' ); // Get window element.
console.log( { win } ); // Log window element.

const button = $( 'button' ); // Get button elements.
console.log( { button } ); // Log button elements.
console.log( button.toArray() ); // Log array of button elements.
console.log( button.getFirstAndLast() ); // Log first and last button elements.

const li = $( 'li' ); // Get list elements.
console.log( { li } ); // Log list elements.
console.log( li.toArray() ); // Log array of list elements.
console.log( li.getFirstAndLast() ); // Log first and last list elements.
li.addClass( 'foo' ).addClass( 'bar' ); // Add classes .foo and .bar to list elements.
console.log( li.toArray() ); // Log array of list elements.
li.removeClass( 'foo' ).removeClass( 'bar' ); // Remove classes .foo and .bar from list elements.
console.log( li.toArray() ); // Log array of list elements.

/*******************************************************************************
 * END TEST CASES
 *******************************************************************************/
