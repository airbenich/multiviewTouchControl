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
    grid.elementList['preview'].onClick(function () {
        mainswitcher.cut();
    });
    
    grid.elementList['preview'].onTransitionChange(function (position) {
        mainswitcher.setTransitionPosition(position);
    });
    
    grid.elementList['input-1'].onClick(function () {
        mainswitcher.changePreviewInput(1);
    });
    
    grid.elementList['input-2'].onClick(function () {
        mainswitcher.changePreviewInput(2);
    });
    
    grid.elementList['input-3'].onClick(function () {
        mainswitcher.changePreviewInput(3);
    });
    
    grid.elementList['input-4'].onClick(function () {
        mainswitcher.changePreviewInput(4);
    });
    
    grid.elementList['input-5'].onClick(function () {
        mainswitcher.changePreviewInput(5);
    });
    
    grid.elementList['input-6'].onClick(function () {
        mainswitcher.changePreviewInput(6);
    });
    
    grid.elementList['input-7'].onClick(function () {
        mainswitcher.changePreviewInput(7);
    });
    
    grid.elementList['input-8'].onClick(function () {
        mainswitcher.changePreviewInput(8);
    });
}

