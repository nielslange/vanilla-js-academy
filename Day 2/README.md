# Day 2

## Variable location

⚠️ It's bad to declare variables or persistent elements inside event listener as they will be declared everytime teh event listener runs.

**Bad example:**

```
// Check the toggle checkbox
var toggle = document.querySelector('#show-password');

// Listen for click events on the toggle
toggle.addEventListener('click', function (event) {

	// Get the password field
	var password = document.querySelector('#password');

	// If the toggle is checked, change the type to "text"
	// Otherwise, change it back to "password"
	if (toggle.checked) {
		password.type = 'text';
	} else {
		password.type = 'password';
	}

}, false);
```

**Good example:**

```
// Get the password field and toggle checkbox
var password = document.querySelector('#password');
var toggle = document.querySelector('#show-password');

// Listen for click events on the toggle
toggle.addEventListener('click', function (event) {

	// If the toggle is checked, change the type to "text"
	// Otherwise, change it back to "password"
	if (toggle.checked) {
		password.type = 'text';
	} else {
		password.type = 'password';
	}

}, false);
```

## Field type vs. field state

⚠️ Instead of checking the type of the input field, the state of teh input field should be checked.

**Bad example:**

```
// Listen for click events on the toggle
toggle.addEventListener('click', function (event) {

	// If the password is hidden, show it
	// Otherwise, hide it
	if (password.type === 'password') {
		password.type = 'text';
	} else {
		password.type = 'password';
	}

}, false);
```

**Good example:**

```
// Listen for click events on the toggle
toggle.addEventListener('click', function (event) {

	// If the checkbox is checked, show it
	// Otherwise, hide it
	if (toggle.checked) {
		password.type = 'text';
	} else {
		password.type = 'password';
	}

}, false);
```

## Ready Event

⚠️ When using Vanilla JS, the equivalent of `jQuery.ready()` is not needed if the Vanilla JS code gets placed in the footer.

**Bad example:**

```
document.addEventListener('load', function () {

	// Get the password field and toggle checkbox
	var password = document.querySelector('#password');
	var toggle = document.querySelector('#show-password');

	// Listen for click events on the toggle
	toggle.addEventListener('click', function (event) {

		// If the toggle is checked, change the type to "text"
		// Otherwise, change it back to "password"
		if (toggle.checked) {
			password.type = 'text';
		} else {
			password.type = 'password';
		}

	}, false);

}, false);
```

**Good example:**

```
// Get the password field and toggle checkbox
var password = document.querySelector('#password');
var toggle = document.querySelector('#show-password');

// Listen for click events on the toggle
toggle.addEventListener('click', function (event) {

	// If the toggle is checked, change the type to "text"
	// Otherwise, change it back to "password"
	if (toggle.checked) {
		password.type = 'text';
	} else {
		password.type = 'password';
	}

}, false);
```
