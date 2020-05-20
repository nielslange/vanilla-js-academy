# Day 6

## Keeping Code DRY

⚠️ DRY → Don't Repeat Yourself! While it might sound tempting to copy, paste, and adjust similar functionality in the short term, it increases the maintenance effort exceptionally in the long term. Instead of duplicating and adjusting code, it's better to add data-attributes to reuse the existing code.

**Bad example**

```js
// Get checkboxes
var showPW = document.querySelector('#show-password');
var showPWs = document.querySelector('#show-passwords');
```

and 

```js
// Listen to all click events in the browser
showPW.addEventListener('click', function (event) {

	// Get the password field
	var password = document.querySelector('#password');

	// If the toggle is checked, change the type to "text"
	// Otherwise, change it back to "password"
	if (event.target.checked) {
		password.type = 'text';
	} else {
		password.type = 'password';
	}

}, false);

// Listen to all click events in the browser
showPWs.addEventListener('click', function (event) {

	// Check target password fields
	var passwords = Array.prototype.slice.call(document.querySelectorAll('#current-password, #new-password'));

	// Loop through each password field
	passwords.forEach(function (password) {

		// If the toggle is checked, change the type to "text"
		// Otherwise, change it back to "password"
		if (event.target.checked) {
			password.type = 'text';
		} else {
			password.type = 'password';
		}

	});

}, false);
```

**Good example**

```js
// Listen to all click events in the browser
document.addEventListener('click', function (event) {

	// Check if clicked item was a password toggle
	// If not, return and stop running the callback function
	if (!event.target.matches('[data-pw-toggle]')) return;

	// Check target password fields
	var passwords = Array.prototype.slice.call(document.querySelectorAll(event.target.getAttribute('data-pw-toggle')));

	// Loop through each password field
	passwords.forEach(function (password) {

		// If the toggle is checked, change the type to "text"
		// Otherwise, change it back to "password"
		if (event.target.checked) {
			password.type = 'text';
		} else {
			password.type = 'password';
		}

	});

}, false);
```