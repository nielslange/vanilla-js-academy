/**
 * Define constructor pattern
 *
 * @param {String} selector
 * @param {String} options
 */
const Rue = function ( selector, options ) {
	this.elem = document.querySelector( selector );
	this.data = options.data;
	this.template = options.template;
};

/**
 * Initialize app
 */
const app = new Rue( '#app', {
	// Define data.
	data: {
		time: 60,
	},
	// Define functions.
	template: function ( props ) {
		return `${ props.time }`;
	},
} );

/**
 * Define render function
 */
Rue.prototype.render = function () {
	this.elem.innerHTML = this.template( this.data );
};

/**
 * Define interval to count down
 */
const countDown = window.setInterval( function () {
	// Show time.
	app.render();

	// Decrease time;
	app.data.time--;
	
	// Stop counter if count is zero.
	if ( 0 > app.data.time ) {
		window.clearInterval( countDown );
	}
}, 1000 );
