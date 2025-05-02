const { app, BrowserWindow } = require('electron/main')
const path = require('node:path')

const createWindow = () => {
  const win = new BrowserWindow({
    width: 825,
    height: 675,
    resizable: false,
    maximizable: false,
    autoHideMenuBar: true,
    darkTheme: true,
    disableHtmlFullscreenWindowResize: true,
    webPreferences: {
      contextIsolation: false,
      nodeIntegration: true,
      allowRunningInsecureContent: true,
    }
  })

  win.loadFile(path.join(__dirname, 'index.html'))
  // win.webContents.openDevTools(); For debugging
}

app.whenReady().then(() => {
  createWindow()

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow()
    }
  })
})

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})
