# Day 4

## NodeLists and forEach()

⚠️ As not every browser supports to run the `forEach()` function on a `NodeList`. The `NodeList` should either be cast into an array or a [polyfill](https://developer.mozilla.org/en-US/docs/Web/API/NodeList/forEach#Polyfill) should be added.

**Bad example:**

```js
// Get the password field and toggle checkbox
var passwords = document.querySelectorAll('[type="password"]');
var toggle = document.querySelector('#show-passwords');

// Listen for click events on the toggle
toggle.addEventListener('click', function (event) {

	// Loop through each password field
	passwords.forEach(function (password) {

		// If the toggle is checked, change the type to "text"
		// Otherwise, change it back to "password"
		if (toggle.checked) {
			password.type = 'text';
		} else {
			password.type = 'password';
		}

	});

}, false);
```

**Good example:**

```js
// Get the password field and toggle checkbox
var passwords = Array.prototype.slice.call(document.querySelectorAll('[type="password"]'));
var toggle = document.querySelector('#show-passwords');

// Listen for click events on the toggle
toggle.addEventListener('click', function (event) {

	// Loop through each password field
	passwords.forEach(function (password) {

		// If the toggle is checked, change the type to "text"
		// Otherwise, change it back to "password"
		if (toggle.checked) {
			password.type = 'text';
		} else {
			password.type = 'password';
		}

	});

}, false);
```

## Targeting Individual Fields

⚠️ Instead of targeting every element individually, it's better to target the corresponding elements in one call.


**Bad example:**

```js
// Get the password field and toggle checkbox
var toggle = document.querySelector('#show-passwords');
var currentPW = document.querySelector('#current-password');
var newPW = document.querySelector('#new-password');

// Listen for click events on the toggle
toggle.addEventListener('click', function (event) {

	// If the toggle is checked, change the type to "text"
	// Otherwise, change it back to "password"
	if (toggle.checked) {
		currentPW.type = 'text';
		newPW.type = 'text';
	} else {
		currentPW.type = 'password';
		newPW.type = 'password';
	}

}, false);
```

**Good example:**

```js
// Get the password field and toggle checkbox
var passwords = Array.prototype.slice.call(document.querySelectorAll('[type="password"]'));
var toggle = document.querySelector('#show-passwords');

// Listen for click events on the toggle
toggle.addEventListener('click', function (event) {

	// Loop through each password field
	passwords.forEach(function (password) {

		// If the toggle is checked, change the type to "text"
		// Otherwise, change it back to "password"
		if (toggle.checked) {
			password.type = 'text';
		} else {
			password.type = 'password';
		}

	});

}, false);
```