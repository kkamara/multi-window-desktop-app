const electron = require('electron')
const app = electron.app
const BrowserWindow = electron.BrowserWindow
const path = require('node:path')

const inProduction = app.isPackaged

let mainWindow

function createWindow() {
    mainWindow = new BrowserWindow({ width: 900, height: 680 })

    if (inProduction) {
        mainWindow.loadURL(`file://${path.join(__dirname, '../build/index.html')}`)
    } else {
        mainWindow.loadURL('http://localhost:3000')
    }

    mainWindow.on('closed', () => (mainWindow = null))
}

app.on('ready', createWindow)

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit()
    }
})

app.on('activate', () => {
    if (mainWindow === null) {
        createWindow()
    }
})
