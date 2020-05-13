class TouchableView {
    constructor(height, width, name) {
        this.domElement = null;
        this.height = height;
        this.width = width;
        this.name = name;
        this.transitionStart = null;
        this.transitionCurrent = null;
        this.gestureThreshold = 15;
        this.gestureNotCompletedAnimationTime = 500;
        this.transitionLength = 170;
        this.selector = 'touchable-view';
        this.onClickCallbacks = [];
        this.onDoubleClickCallbacks = [];
        this.onTransitionChangeCallbacks = [];
        this.startX = 0;
        this.startY = 0;
        this.transitionActive = false;
        // this.dist = 0;
    }

    setDomElement(domElement) {
        this.domElement = domElement;
        this.activateUiHandler();
    }

    activateUiHandler() {
        let thisElement = this;

        this.domElement.click(function () {
            thisElement.clickHandler();
        });

        this.domElement.dblclick(function () {
            thisElement.dblclickHandler();
        });


        this.domElement[0].addEventListener("touchstart", function(eve){
            let touchobj = eve.changedTouches[0]; // erster Finger
            thisElement.startX = parseInt(touchobj.clientX); // X/Y-Koordinaten relativ zum Viewport
            thisElement.startY = parseInt(touchobj.clientY);
            // console.log("touchstart bei ClientX: " + thisElement.startX + "px ClientY: " + thisElement.startY + "px");

            thisElement.transitionActive = true;
            // eve.preventDefault();
        });
    
        this.domElement[0].addEventListener("touchmove", function(eve){
            let touchobj = eve.changedTouches[0]; // erster Finger

            var distanceX = Math.abs(touchobj.clientX-thisElement.startX);
            var distanceY = Math.abs(touchobj.clientY-thisElement.startY);
            var longestDistance = distanceX > distanceY ? distanceX : distanceY;
            var transitionLength = 270;
            var transition = longestDistance/(transitionLength/100);

            if(thisElement.transitionActive == true) {
                if(transition >= 100) {
                    thisElement.setTransition(100);
                    thisElement.transitionActive = false;
                }
                if(transition < 100) {
                    thisElement.setTransition(transition);
                }
            }

            // eve.preventDefault();
        });
        
        this.domElement[0].addEventListener("touchend", function(eve){
            let touchobj = eve.changedTouches[0]; // reference first touch point for this event
            // console.log("touchend bei X-Koordinate: " + touchobj.clientX + "px Y-Koordinate: " + touchobj.clientY + "px");
            // eve.preventDefault();
        });
    }

    clickHandler() {
        this.click();
    }

    dblclickHandler() {
        this.doubleClick();
    }

    setTransition(value) {
        this.transitionCurrent = value;
        this.transitionChange(value*100);

        // ui feedback for transition
        if(this.transitionCurrent != null) {
            this.domElement.css('opacity',1-this.transitionCurrent/100);
        } else {
            this.domElement.css('opacity',1);
        }
    }

    render(domElement) {
        domElement.append('<div class="' + this.selector + ' ' + this.name + '">' + this.name + '</div>');
        this.setDomElement($(domElement).find('.' + this.selector).last());
    }

    // click event execution
    click() {
        console.log('Click on ' + this.name);
        this.onClickCallbacks.forEach(element => {
            // execute element
            element();
        });
    }
    
    // double click event execution
    doubleClick() {
        console.log('Double on ' + this.name);
        this.onDoubleClickCallbacks.forEach(element => {
            // execute element
            element();
        });
    }

    // click event registration
    onClick(callback) {
        this.onClickCallbacks.push(callback);
    }

    // click event registration
    onDoubleClick(callback) {
        this.onDoubleClickCallbacks.push(callback);
    }

    // transition change event execution
    transitionChange(position) {
        // console.log('Transition Change on ' + this.name + ' to ' + position);
        console.log('Transition Change on ' + this.name);
        this.onTransitionChangeCallbacks.forEach(element => {
            // execute element
            element(position);
        });
    }

    // transition change event registration
    onTransitionChange(callback) {
        this.onTransitionChangeCallbacks.push(callback);
    }
    
}