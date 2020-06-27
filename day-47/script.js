// Define field elements.
const fields = ['name', 'address', 'email', 'more'];

// Define button element.
const save = document.querySelector('button');

/**
 * Get field
 * 
 * @param {string} id The ID of the element.
 * @return {string} The corresponding element.
 */
function getElement(id) {
  return document.querySelector(`#${id}`);
}

/**
 * Load field
 * 
 * @param {string} field The current element.
 * @return {string} The value of the current element.
 */
function loadField(field) {
  console.log(field);
	return localStorage.getItem(field);
}  

/**
 * Load fields
 */
function loadFields() {
	fields.forEach( field => {
    getElement(field).value = loadField(field);
  } );
}

/**
 * Save field
 * 
 * @param {name} field The current field
 */
function saveField(field) {
  localStorage.setItem(field, getElement(field).value);
}

/**
 * Empty fields
 */
function emptyFields() {
  fields.forEach( field => getElement(field).value = '' );
}

/**
 * Clear storage
 */
function clearStorage() {
	localStorage.clear();
}

// Listen to all input events and save the value of the affected field.
document.addEventListener('input', event => {
  saveField(event.target.id);
} );

// Listen to all click events and clear the storage and empty the fields.
save.addEventListener('click', () => {
  clearStorage();
  emptyFields();
} );

// Load all field values when page gets loaded.
loadFields();