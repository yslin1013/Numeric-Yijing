const { app, BrowserWindow, Menu } = require('electron');

const menu = Menu.buildFromTemplate([
  {
    label: 'File',
    submenu: [
      { role: 'close' }
    ]
  },
  {
    label: 'View',
    submenu: [
      { role: 'reload' },
      { role: 'toggleDevTools' },
      { type: 'separator' },
      { role: 'zoomIn' },
      { role: 'zoomOut' },
    ]
  },
  {
    role: 'Help',
    submenu: [
      {
        label: 'GitHub',
        click: async () => {
          const { shell } = require('electron')
          await shell.openExternal('https://github.com/yslin1013/Numeric-Yijing')
        }
      }
    ]
  }
]);
Menu.setApplicationMenu(menu);

function createWindow() {
  const win = new BrowserWindow({
    width: 500,
    height: 400,
    icon: __dirname + '/images/favicon.ico'
  });
  win.loadFile('index.html');
}

app.whenReady().then(() => {
  createWindow();
  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});
