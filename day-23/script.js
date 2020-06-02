// Get news container.
const app = document.querySelector('#app');

// Define the monsters and sock array.
const monsters = [
	'monster1',
	'monster2',
	'monster3',
	'monster4',
	'monster5',
	'monster6',
	'monster7',
	'monster8',
	'monster9',
	'monster10',
	'monster11',
	'sock'
];

// Define empty items element.
let items = '';

/**
 * Randomly shuffle an array
 *
 * https://stackoverflow.com/a/2450976/1293256
 * @param  {Array} array The array to shuffle
 * @return {Array}       The shuffled array
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
		temporaryValue 			= array[currentIndex];
		array[currentIndex] = array[randomIndex];
		array[randomIndex] 	= temporaryValue;
	}

	return array;

};

/**
 * Initialize app.
 *
 * @return void 
 */
function init() {
	shuffle( monsters ).forEach( element => {
		items += `<div class="grid"><img src="images/${element}.svg" alt="${element}"></div>`;
	} );
	
	app.innerHTML = `<div class="row">${items}</div>`;
}

// Run app once page is loaded.
init();
