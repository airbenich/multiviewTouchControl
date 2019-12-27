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
        this.onTransitionChangeCallbacks = [];
    }

    setDomElement(domElement) {
        this.domElement = domElement;
        this.activateUiHandler();
    }

    activateUiHandler() {
        let thisElement = this;

        // mousedown
        this.domElement.mousedown(function(event) {
            thisElement.mousedownHandler(event);
        });
        
        // mousemove
        this.domElement.mousemove(function(event) {
            thisElement.mousemoveHandler(event.pageX,event.pageY);
        });
        
        // mouseup
        this.domElement.mouseup(function() {
            thisElement.mouseupHandler();
        });
    }

    mousemoveHandler(x,y) {
        if(this.transitionStart !== null) {
            var distanceX = Math.abs(x-this.transitionStart.x);
            var distanceY = Math.abs(y-this.transitionStart.y);
            var longestDistance = distanceX > distanceY ? distanceX : distanceY;
            var transitionLength = 170;
            var transition = longestDistance/(transitionLength/100);
            if(transition <= 100 && transition >= 0) {
                this.setTransition(transition);
            } else {
                if(transition > 100) this.setTransition(100);
                if(transition < 0) this.setTransition(0);
            }

            // ui feedback
            if(this.transitionCurrent > this.gestureThreshold) {
                this.domElement.css('background','#35CD4B');
            }
            // console.log(this.transitionCurrent);
        }
    }
    
    mousedownHandler() {
        event.preventDefault();
        this.transitionStart = {
            x:event.pageX,
            y:event.pageY
        };
        console.log('Mousedown on ' + this.name);

        // ui feedback
        this.domElement.css('background','#F2CF2F');
    }

    mouseupHandler() {
        let thisElement = this;
        console.log('Mouseup on ' + this.name);
        if(this.transitionCurrent > this.gestureThreshold) {
            // gesture
            if(this.transitionCurrent < 100 && this.transitionCurrent > 0) {
                // finish animation when not finished
                if(this.transitionCurrent >= 50)  $(this).animate({transitionCurrent: 100}, thisElement.gestureNotCompletedAnimationTime, transitionCompleted());
                if(this.transitionCurrent < 50)   $(this).animate({transitionCurrent: 0},   thisElement.gestureNotCompletedAnimationTime, transitionCompleted());
            } else {
                transitionCompleted();
            }
        } else {
            // click
            this.click();
            resetMouseValues();
        }

        function transitionCompleted() {
            console.log('Transition completed');
            resetMouseValues();
        }
        
        function resetMouseValues() {
            thisElement.transitionStart = null;
            thisElement.setTransition(null);

            // ui feedback
            thisElement.domElement.css('background','#222');
        }
    }

    setTransition(value) {
        this.transitionCurrent = value;
        this.transitionChange(value);

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

    // click event registration
    onClick(callback) {
        this.onClickCallbacks.push(callback);
    }

    // transition change event execution
    transitionChange(position) {
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