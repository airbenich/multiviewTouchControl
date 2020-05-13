// This file is required by the index.html file and will
// be executed in the renderer process for that window.
// No Node.js APIs are available in this process because
// `nodeIntegration` is turned off. Use `preload.js` to
// selectively enable features needed in the rendering
// process.

const { ipcRenderer, remote } = require( "electron" );

// Build multiview touchscreen grid
let grid = new Grid('#multiViewGrid');
grid.addColumn();
grid.addColumn();
grid.addColumn();
grid.addRowInColumn(0,new TouchableView(2,2,'preview'));
grid.addRowInColumn(0,new TouchableView(2,2,'program'));
grid.addRowInColumn(1,new TouchableView(1,1,'input-1'));
grid.addRowInColumn(1,new TouchableView(1,1,'input-2'));
grid.addRowInColumn(1,new TouchableView(1,1,'input-3'));
grid.addRowInColumn(1,new TouchableView(1,1,'input-4'));
grid.addRowInColumn(2,new TouchableView(1,1,'input-5'));
grid.addRowInColumn(2,new TouchableView(1,1,'input-6'));
grid.addRowInColumn(2,new TouchableView(1,1,'input-7'));
grid.addRowInColumn(2,new TouchableView(1,1,'input-8'));
grid.render();

// initialize videomixer
var switcherip = remote.getGlobal('switcherip');
if(switcherip !== null) {
    let mainswitcher = new Videoswitcher('Mainswitcher',switcherip);

    // connect touchable view to mixer action
    grid.elementList['preview'].onDoubleClick(function () {
        mainswitcher.cut();
    });
    
    grid.elementList['preview'].onTransitionChange(function (position) {
        mainswitcher.setTransitionPosition(position);
    });

    grid.elementList['program'].onTransitionChange(function (position) {
        mainswitcher.setTransitionPosition(position);
    });
    
    grid.elementList['input-1'].onClick(function () {
        mainswitcher.changePreviewInput(1);
    });

    grid.elementList['input-1'].onDoubleClick(function () {
        mainswitcher.cut();
    });
    
    grid.elementList['input-2'].onClick(function () {
        mainswitcher.changePreviewInput(2);
    });

    grid.elementList['input-2'].onDoubleClick(function () {
        mainswitcher.cut();
    });
    
    grid.elementList['input-3'].onClick(function () {
        mainswitcher.changePreviewInput(3);
    });

    grid.elementList['input-3'].onDoubleClick(function () {
        mainswitcher.cut();
    });
    
    grid.elementList['input-4'].onClick(function () {
        mainswitcher.changePreviewInput(4);
    });

    grid.elementList['input-4'].onDoubleClick(function () {
        mainswitcher.cut();
    });
    
    grid.elementList['input-5'].onClick(function () {
        mainswitcher.changePreviewInput(5);
    });

    grid.elementList['input-5'].onDoubleClick(function () {
        mainswitcher.cut();
    });
    
    grid.elementList['input-6'].onClick(function () {
        mainswitcher.changePreviewInput(6);
    });

    grid.elementList['input-6'].onDoubleClick(function () {
        mainswitcher.cut();
    });
    
    grid.elementList['input-7'].onClick(function () {
        mainswitcher.changePreviewInput(7);
    });

    grid.elementList['input-7'].onDoubleClick(function () {
        mainswitcher.cut();
    });
    
    grid.elementList['input-8'].onClick(function () {
        mainswitcher.changePreviewInput(8);
    });

    grid.elementList['input-8'].onDoubleClick(function () {
        mainswitcher.cut();
    });
}

document.addEventListener('touchstart', handleTouchStart, false);        
document.addEventListener('touchmove', handleTouchMove, false);

var xDown = null;                                                        
var yDown = null;

function getTouches(evt) {
  return evt.touches ||             // browser API
         evt.originalEvent.touches; // jQuery
}                                                     

function handleTouchStart(evt) {
    const firstTouch = getTouches(evt)[0];                                      
    xDown = firstTouch.clientX;                                      
    yDown = firstTouch.clientY;                                      
};                                                

function handleTouchMove(evt) {
    if ( ! xDown || ! yDown ) {
        return;
    }

    var xUp = evt.touches[0].clientX;                                    
    var yUp = evt.touches[0].clientY;

    var xDiff = xDown - xUp;
    var yDiff = yDown - yUp;

    console.log(xDiff);
    

    if ( Math.abs( xDiff ) > Math.abs( yDiff ) ) {/*most significant*/
        if ( xDiff > 0 ) {
            /* left swipe */ 
        } else {
            /* right swipe */
        }                       
    } else {
        if ( yDiff > 0 ) {
            /* up swipe */ 
        } else { 
            /* down swipe */
        }                                                                 
    }
    /* reset values */
    xDown = null;
    yDown = null;                                             
};