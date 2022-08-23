// Modules to control application life and create native browser window
const {app, BrowserWindow, BrowserView} = require('electron')
const path = require('path')
const yargs = require('yargs');
const { ipcMain } = require( "electron" );
require('@electron/remote/main').initialize()


// command line parameters
const argv = yargs.command('switcher [ip]', 'sets the video switcher ip address', (yargs) => {
  yargs.positional('ip', {
    describe: 'ip address to contact video switcher',
    default: 5000
  })
}, (argv) => {})
  .help()
  .alias('help', 'h')
  .argv

// check command line parameters
if (argv.ip) {
  // set switcher ip
  console.log('video switcher ip address: ' + argv.ip);
  global.switcherip = argv.ip;
} else {
  // enter dmeo mode when no ip
  console.log('Please add switcher ip: npm start switcher 192.168.1.100');
  console.log('Starting demo mode');
  global.switcherip = "192.168.1.100";
}

ipcMain.on("getIp", (event) => {
  event.sender.send("switcherIp", global.switcherip)
})

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let mainWindow

function createWindow () {
  // // Create the browser window.
  let win = new BrowserWindow({
    width: 1920,
    height: 1080,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false
    }
  })

  // window fullscreen
  win.maximize();
  win.setFullScreen(true)
  win.on('closed', () => {
    win = null
  })

  let view = new BrowserView()
  win.setBrowserView(view)
  // view.setBounds({ x: 0, y: 0, width: win.getSize()[0], height: win.getSize()[1] })
  // view.setAutoResize({
  //   width:true,
  //   height:true,
  //   horizontal:true,
  //   vertical:true,
  // });

  win.loadFile('index.html');

  // Open the DevTools.
  // win.webContents.openDevTools()

  // Emitted when the window is closed.
  win.on('closed', function () {
    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    win = null
  })
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', createWindow)

// Quit when all windows are closed.
app.on('window-all-closed', function () {
  // On macOS it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') app.quit()
})

app.on('activate', function () {
  // On macOS it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (mainWindow === null) createWindow()
})

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.
