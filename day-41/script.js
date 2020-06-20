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
    // Get array of matching elements.
    const elements = toArray( this.elements );
    
    // Define empty array.
    let array = [];

    // Add first matching element to array.
    array.push( first( elements ) );

    // Add last matching element to array.
    array.push( last( elements ) );

    // Return the array with teh first and the last matching element.
    return toArray( array );
  };

  /**
   * Add a class to all matching elements.
   * 
   * @param {String} className The class name to add.
   */
  Constructor.prototype.addClass = function( className ) {
    // Get array of matching elements.
    const elements = toArray( this.elements );

    // Loop through elements and add the class name.
    elements.forEach( ( element ) => {
      element.classList.add( className );
    } );
  };

  /**
   * Remove a class to all matching elements.
   * 
   * @param {String} className The class name to remove.
   */
  Constructor.prototype.removeClass = function( className ) {
    // Get array of matching elements.
    const elements = toArray( this.elements );
    
    // Loop through elements and remove the class name.
    elements.forEach( ( element ) => {
      element.classList.remove( className );
    } );
  };

  return instance;
} )();

/*******************************************************************************
 * START TEST CASES
*******************************************************************************/

const doc = $( 'document' );              // Get document element.
console.log( { doc } );                   // Log document element.

const win = $( 'window' );                // Get window element.
console.log( { win } );                   // Log window element.

const button = $( 'button' );             // Get button elements.
console.log( { button } );                // Log button elements.
console.log( button.toArray() );          // Log array of button elements.
console.log( button.getFirstAndLast() );  // Log first and last button elements.

const li = $( 'li' );                     // Get list elements.
console.log( { li } );                    // Log list elements.
console.log( li.toArray() );              // Log array of list elements.
console.log( li.getFirstAndLast() );      // Log first and last list elements.
li.addClass('foo');                       // Add class .foo to list elements.
console.log( li.toArray() );              // Log array of list elements.
li.addClass('bar');                       // Add class .bar to list elements.
console.log( li.toArray() );              // Log array of list elements.
li.removeClass('foo');                    // Remove class .foo from list elements.
console.log( li.toArray() );              // Log array of list elements.
li.removeClass('bar');                    // Remove class .bar from list elements.
console.log( li.toArray() );              // Log array of list elements.

/*******************************************************************************
 * END TEST CASES
*******************************************************************************/
