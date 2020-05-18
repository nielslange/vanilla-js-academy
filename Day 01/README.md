# Day 1

## Getting an Element in the DOM

To get an element, the selector `querySelector()` can be used. This will return the first matching element. To get more elements, the method `querySelectorAll()` needs to be used.

Sources:

- https://developer.mozilla.org/en-US/docs/Web/API/Document/querySelector
- https://developer.mozilla.org/en-US/docs/Web/API/Document/querySelectorAll


## Listening for Events and User Interactions

To listen to events and user actions, the method `addEventListener()` is needed. The method requires at least an event type, e.g. `click`, `change`, `input`, etc. and a listener, e.g. an annonymous function. 

Sources:

- https://developer.mozilla.org/en-US/docs/Web/API/EventTarget/addEventListener
- https://developer.mozilla.org/en-US/docs/Web/Events

## Project: Toggle Password Visibility

The task of this project was to create a script that toggles the visibility of a password input field. I created the following two versions:

- [Toggle via checkbox](https://github.com/nielslange/vanilla-js-academy/tree/master/Day%2001/Toggle%20via%20checkbox)
- [Toggle via icon](https://github.com/nielslange/vanilla-js-academy/tree/master/Day%2001/Toggle%20via%20icon)