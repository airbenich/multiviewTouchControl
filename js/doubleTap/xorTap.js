/**
 * Creates a event handler which mutually exclusively responds to either a single or double (or higher) click/tap.
 * Copyright (c)2012 Stephen M. McKamey.
 * Licensed under The MIT License.
 * 
 * @param {function...} actions the possible actions to take in order by number of clicks
 * @param {number} speed max delay between multi-clicks in milliseconds (optional, default: 300ms)
 * @return {function(Event)} mutually exclusive event handler
 */
var xorTap = function() {
	'use strict';

	var actions = Array.prototype.slice.call(arguments),
		length = actions.length;

	var speed = 300;//ms
	if (typeof actions[length-1] === 'number') {
		length--;
		speed = Math.abs(+actions[length]) || speed;
	}

	var pendingClick = 0,
		kill = function() {
			// kill any pending single clicks
			if (pendingClick) {
				clearTimeout(pendingClick);
				pendingClick = 0;
			}
		},
		xor = function(e) {
			e = (e || window.event);

			kill();

			var elem = this,
				action = actions[e.detail-1];

			if (typeof action === 'function') {
				if (e.detail < length) {
					if (typeof jQuery !== 'undefined' &&
						''+e !== '[object Object]') {
						// NOTE: IE8 freaks if event is kept past its scope
						e = jQuery.extend(new jQuery.Event(), e);
					}
					pendingClick = setTimeout(function() {
						action.call(elem, e);
					}, speed);

				} else {
					action.call(elem, e);
				}
			}
		};

	// expose kill for certain edge cases
	xor.kill = kill;

	return xor;
};
