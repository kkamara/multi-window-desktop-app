const electron = require('electron');
const app = electron.app;
const ipcMain = electron.ipcMain;
const BrowserWindow = electron.BrowserWindow;
const path = require('path');

const inProduction = app.isPackaged;

let mainWindow;
let childWindow;

function createWindow() {
    mainWindow = new BrowserWindow({ 
        width: 900, 
        height: 680, 
        webPreferences: {
            devTools: inProduction ? false : true,
            nodeIntegration: true,
            contextIsolation: false,
            enableRemoteModule: true,
        },
        show: false,
     });

    mainWindow.loadURL(`file://${path.join(
        __dirname, 
        '../', 
        'src/views/index.html', // index.pug?exampleArg=test
    )}`);

    mainWindow.maximize();
    mainWindow.show();

    mainWindow.on('closed', () => (mainWindow = null));
}

// Function to create child window of parent one
function createChildWindow() {
    childWindow = new BrowserWindow({
        width: 1000,
        height: 700,
        modal: true,
        show: false,
        parent: mainWindow,
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: false,
            enableRemoteModule: true,
        },
    });
    
    childWindow.loadURL(`file://${path.join(
        __dirname, 
        '../', 
        'src/views/settings.html',
    )}`);
    
    childWindow.once("ready-to-show", () => {
      childWindow.show();
    });
}

ipcMain.on("openChildWindow", (event, arg) => {
    createChildWindow();
});

ipcMain.on("closeChildWindow", (event, arg) => {
    childWindow.close();
});

app.on('ready', createWindow);

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit();
    }
});

app.on('activate', () => {
    if (mainWindow === null) {
        createWindow();
    }
});
