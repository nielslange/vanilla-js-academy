// Define duration.
const duration = 70;

// Define the timer interval.
let timer;

/**
 * Define constructor pattern
 *
 * @param {String} selector The selector of the target element.
 * @param {String} options The options of the component.
 */
const Rue = function ( selector, options ) {
	this.elem = document.querySelector( selector );
	this.data = options.data;
	this.template = options.template;
};

/**
 * Define render function
 */
Rue.prototype.render = function () {
	const data = this.template( this.data );

	if ( typeof data == 'number' ) {
		this.elem.innerHTML = format( data );
	} else {
		this.elem.innerHTML = data;
	}
};

/**
 * Format the remaining time
 *
 * @param {Integer} time The remaining time in seconds.
 */
const format = function ( time ) {
	let minutes = 0;
	let seconds = 0;

	minutes = Math.floor( time / 60 );
	seconds = time % 60;

	minutes = minutes.toString().padStart( 2, '0' );
	seconds = seconds.toString().padStart( 2, '0' );

	return `${ minutes }:${ seconds }`;
};

/**
 * Define interval to count down
 */
const countdown = function () {
	// Decrease time by 1 second;
	app.data.time--;

	// Check of the timer should be stopped.
	stopTimer();

	// Update the UI.
	app.render();
};

/**
 * Start the timer
 */
const startTimer = function () {
	// Reset the app data.
	app.data.time = duration;

	// Render the initial UI.
	app.render();

	// Start the countdown timer.
	timer = setInterval( countdown, 1000 );
};

/**
 * Stop the timer
 */
const stopTimer = function () {
	if ( 0 < app.data.time ) return;
	clearInterval( timer );
};

/**
 * Handle click events
 *
 * @param {Object} event The event object.
 */
const clickHandler = function ( event ) {
	// Only run, if the restart button was clicked.
	if ( ! event.target.hasAttribute( 'data-restart-timer' ) ) return;

	// Start the timer.
	startTimer();
};

/**
 * Create the timer component
 *
 * @param {Object} selector The selector of the target element.
 */
const app = new Rue( '#app', {
	// Define data.
	data: {
		time: duration,
	},

	// Define functions.
	template: function ( props ) {
		// Show restart button, if timer is done.
		if ( 1 > props.time ) {
			return '⏰ <p><button class="btn btn-primary" data-restart-timer>Restart timer</button></p>';
		}

		console.log( props.time );

		// Show the current time, if the timer is still running.
		return props.time;
	},
} );

// Start the timer.
startTimer();

// Listen to click events.
document.addEventListener( 'click', clickHandler );
