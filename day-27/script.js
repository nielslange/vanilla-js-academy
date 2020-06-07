// Get app container.
const app = document.querySelector('#app');

// Get message container.
const message = document.querySelector('#message');

// Get play again container.
const playAgain = document.querySelector('#play-again');

// Array that keeps all the maritim icons.
const items = [
	{ icon: 'anchor', alt: 'A grey anchor' },
	{ icon: 'barometer', alt: 'A barometer with a brown case and white clock face' },
	{ icon: 'bell', alt: 'A golden bell' },
	{ icon: 'captain', alt: 'A captain with a whiteblue-white captions hat and a white uniform' },
	{ icon: 'compass', alt: 'A compass with a grey case and white clock face' },
	{ icon: 'helm', alt: 'A brown, wodden helm' },
	{ icon: 'lifesaver', alt: 'A red-white lifesaver ring' },
	{ icon: 'map', alt: 'A treasure map that shows land and water and an x that marks the treassure' },
	{ icon: 'pipe', alt: 'A grey pipe that is still smoking' },
	{ icon: 'radar', alt: 'A round grey-green radar display' },
	{ icon: 'spyglass', alt: 'A golden spyglass' },
	{ icon: 'vest', alt: 'A red life vest' }
];

// Variable that remembers if you've been caught by the captain.
let caught = false;

// Variable that counts the barrels you've opened.
let checkedBarrels = 0;

/**
 * Randomly shuffle an array
 *
 * https://stackoverflow.com/a/2450976/1293256
 * @param {Array} array The original array.
 * @return {Array} array The shuffled array.
 */
 function shuffle ( array ) {
	let currentIndex = array.length;
	let temporaryValue;
	let randomIndex;

	// While there remain elements to shuffle...
	while (0 !== currentIndex) {
		// Pick a remaining element...
		randomIndex 	= Math.floor(Math.random() * currentIndex);
		currentIndex -= 1;

		// And swap it with the current element.
		temporaryValue      = array[currentIndex];
		array[currentIndex] = array[randomIndex];
		array[randomIndex]  = temporaryValue;
	}

	return uniquify( array );
};

/**
 * Assign uniquie IDs to array elements
 *
 * @param {Array} array The original array.
 * @returns {Array} array The updated array.
 */
function uniquify(  array  ) {
	for (let i = 1; i <= array.length; i++) {
		array[i-1].id = i;
	}

	return array;
}

/**
 * Prepare all barrels.
 *
 * @return void 
 */
function prepareBarrels() {

	// Get empty barrels ready ...
	let elements = '';

	// ... fill them with items ...
	shuffle( items ).forEach( element => {
		elements += `
		<div class="grid" data-item="${element.id}">
			<button class="barrel" alt="A brown wodden barrel"></button>
		</div>
		`;
	} );
	
	// ... and give the filled barrels back.
	app.innerHTML = `<div class="grid-row">${elements}</div>`;

}

/**
 * Open the barrel the pirates selected.
 *
 * @param {Object} element The selected barrel.
 * @returns void
 */
function openBarrel( element ) {

	// Check the item that's inside the barrel.
	const item = getItem( element );

	// Get the barrel itself.
	const barrel = element.parentElement;

	// Stop if the pirates had been caught already.
	if ( caught ) return;

	// Stop if only one barrel is left.
	if ( checkedBarrels === items.length - 1 ) return;

	// Show the content of the barrel if the pirates haven't been caught yet.
	barrel.innerHTML = `<div class="${item.icon}" alt="${item.alt}"></div>`;

	// Increase the count of the barrels the pirates opened already.
	checkedBarrels++;

	// Check if the pirates got caught by the captain ...
	if ( item.icon === 'captain' ) {

		// ... and remember that they got caught ...
		caught = true;

		// ... and show them that they got caught ...
		showLoseMessage();

		// .... and show them the play again button ...
		showPlayAgainButton();

	// ... or if the pirates opened all barrels without being caught ...
	}	else if ( checkedBarrels === items.length - 1 ) {

		// ... and show them that they haven't been caught ...
		showWinMessage();

		// .... and show them the play again button.
		showPlayAgainButton();

	}

}

/**
 * Get the item of the corresponding barrel.
 *
 * @param {Object} element The selected barrel.
 * @returns {Object} The item inside the selected barrel.
 */
function getItem( element ) {
	return items.find( thisItem => {
		return thisItem.id == element.parentElement.getAttribute('data-item') }
	);
}

/**
 * Inform the pirates that they have been caught.
 *
 * @returns void
 */
function showLoseMessage() {
	message.innerHTML = `
	<div class="alert alert-danger text-center" role="alert">
		Nay ... the captain caught you!
	</div>
	`;
}

/**
 * Inform the pirates that they haven't been caught.
 *
 * @returns void
 */
 function showWinMessage() {
	message.innerHTML = `
		<div class="alert alert-success text-center" role="alert">
			Aarr ... you captured all items!
		</div>
	`;
}

/**
 * Show the pirates a play again button.
 *
 * @returns void
 */
function showPlayAgainButton() {
	playAgain.innerHTML += `
		<a class="btn btn-primary btn-block" href="${window.location.href}">
			Play again
		</a>
	`;
}

// Listen to all click elements ..
window.addEventListener( 'click', event => {

	// ... and return if the pirates did not click on a barrel ...
	if ( ! event.target.matches( 'button' ) ) return;

	// .. or open the corresponding barrel the pirates picked.
	openBarrel( event.target );

} );

// Place all barrels at the quay and wait for pirates to open them.
prepareBarrels();
