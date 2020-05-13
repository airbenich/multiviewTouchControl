/**
 * Creates a event handler which unifies click and dblclick events between desktop and touch as tap and dbltap.
 * Copyright (c)2012 Stephen M. McKamey.
 * Licensed under The MIT License.
 * 
 * @param {number} speed max delay between multi-clicks in milliseconds (optional, default: 500ms)
 * @param {number} distance max distance between multi-clicks in pixels (optional, default: 40px)
 * @return {function(Event)} touchend/mouseup event handler
 */
var doubleTap = function(speed, distance) {
	'use strict';

	// default dblclick speed to half sec (default for Windows & Mac OS X)
	speed = Math.abs(+speed) || 500;//ms
	// default dblclick distance to within 40x40 pixel area
	distance = Math.abs(+distance) || 40;//px

	// Date.now() polyfill
	var now = Date.now || function() {
		return +new Date();
	};

	var cancelEvent = function(e) {
		e = (e || window.event);
	
		if (e) {
			if (e.preventDefault) {
				e.stopPropagation();
				e.preventDefault();
			} else {
				try {
					e.cancelBubble = true;
					e.returnValue = false;
				} catch (ex) {
					// IE6
				}
			}
		}
		return false;
	};

	var taps = 0,
		last = 0,
		// NaN will always test false
		x = NaN,
		y = NaN;

	return function(e) {
			e = (e || window.event);

			var time = now(),
				touch = e.changedTouches ? e.changedTouches[0] : e,
				nextX = +touch.clientX,
				nextY = +touch.clientY,
				target = e.target || e.srcElement,
				e2,
				parent;

			if ((last + speed) > time &&
				Math.abs(nextX-x) < distance &&
				Math.abs(nextY-y) < distance) {
				// continue series
				taps++;

			} else {
				// reset series if too slow or moved
				taps = 1;
			}

			// update starting stats
			last = time;
			x = nextX;
			y = nextY;

			// fire tap event
			if (document.createEvent) {
				e2 = document.createEvent('MouseEvents');
				e2.initMouseEvent(
					'tap',
					true,				// click bubbles
					true,				// click cancelable
					e.view,				// copy view
					taps,				// click count
					touch.screenX,		// copy coordinates
					touch.screenY,
					touch.clientX,
					touch.clientY,
					e.ctrlKey,			// copy key modifiers
					e.altKey,
					e.shiftKey,
					e.metaKey,
					e.button,			// copy button 0: left, 1: middle, 2: right
					e.relatedTarget);	// copy relatedTarget

				if (!target.dispatchEvent(e2)) {
					// pass on cancel
					cancelEvent(e);
				}

			} else {
				e.detail = taps;

				// manually bubble up
				parent = target;
				while (parent && !parent.tap && !parent.ontap) {
					parent = parent.parentNode || parent.parent;
				}
				if (parent && parent.tap) {
					// DOM Level 0
					parent.tap(e);

				} else if (parent && parent.ontap) {
					// DOM Level 0, IE
					parent.ontap(e);

				} else if (typeof jQuery !== 'undefined') {
					// cop out and patch IE6-8 with jQuery
					jQuery(this).trigger('tap', e);
				}
			}

			if (taps === 2) {
				// fire dbltap event only for 2nd click
				if (document.createEvent) {
					e2 = document.createEvent('MouseEvents');
					e2.initMouseEvent(
						'dbltap',
						true,				// dblclick bubbles
						true,				// dblclick cancelable
						e.view,				// copy view
						taps,				// click count
						touch.screenX,		// copy coordinates
						touch.screenY,
						touch.clientX,
						touch.clientY,
						e.ctrlKey,			// copy key modifiers
						e.altKey,
						e.shiftKey,
						e.metaKey,
						e.button,			// copy button 0: left, 1: middle, 2: right
						e.relatedTarget);	// copy relatedTarget

					if (!target.dispatchEvent(e2)) {
						// pass on cancel
						cancelEvent(e);
					}

				} else {
					e.detail = taps;

					// manually bubble up
					parent = target;
					while (parent && !parent.dbltap && !parent.ondbltap) {
						parent = parent.parentNode || parent.parent;
					}
					if (parent && parent.dbltap) {
						// DOM Level 0
						parent.dbltap(e);

					} else if (parent && parent.ondbltap) {
						// DOM Level 0, IE
						parent.ondbltap(e);

					} else if (typeof jQuery !== 'undefined') {
						// cop out and patch IE6-8 with jQuery
						jQuery(this).trigger('dbltap', e);
					}
				}
			}
		};
};
