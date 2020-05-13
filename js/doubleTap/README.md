doubleTap.js & xorTap.js
========================

doubleTap.js
------------

This utility emulates standard `click` and `dblclick` behavior for touch devices
on typically non-clickable elements (e.g., an ordinary `<div>` element).

Unfortunately, touch browsers fire a broken `click` event which does not update
the number of clicks making double click events much more difficult handle.
As such, two new events are needed which gets consistently fired in both environments.
These are implemented here as `tap` and `dbltap`.

These events are enabled for both mouse and touch devices by attaching a doubleTap handler:

	// Enable tap & dbltap events
	var myElem = document.getElementById('foo');
	myElem.addEventListener(('ontouchend' in myElem) ? 'touchend' : 'mouseup', doubleTap(speed, distance), false);
	myElem.addEventListener('tap', ontapHandler, false);
	myElem.addEventListener('dbltap', ondbltapHandler, false);

xorTap.js
---------

A related but different common problem is isolating clicks and double (or higher) clicks.

The xorTap.js script adds a helper for creating a combined event handler that fires these
events mutually exclusively. It can be attached to the standard `click` event or the `tap`
event that is created by `doubleTap.js`.

Just pass in handlers for each of the different levels (can even handle triple clicks and higher):

	// Create a combo event handler
	var xorhandler = xorTap(
		function(e) {
			alert('click!');
		},
		function(e) {
			alert('double click!');
		});

	// Attach as click event
	var myElem = document.getElementById('foo');
	myElem.addEventListener('click', xorhandler, false);

	// Or combine with doubleTap to attach as tap event
	var myElem = document.getElementById('bar');
	myElem.addEventListener(('ontouchend' in myElem) ? 'touchend' : 'mouseup', doubleTap(speed, distance), false);
	myElem.addEventListener('tap', xorhandler, false);

Example
-------

The [example](https://github.com/mckamey/doubleTap.js/blob/master/index.html) shows how these different pieces can work together to unify the
experience for touch / mouse environments.

Note for iOS devices
--------------------

Mobile Safari on iOS (iPhone / iPad) has a default behavior of zooming when double tapping.
To disable zooming, a meta tag must be put in the head of the HTML document:

	<meta name="viewport" content="width=device-width,user-scalable=no" />

MIT License
-----------

These scripts are free to use and are distributed under [The MIT License](https://github.com/mckamey/doubleTap.js/blob/master/LICENSE.txt).

Copyright (c)2012 Stephen M. McKamey.
