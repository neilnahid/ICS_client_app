// eslint-disable-next-line
import './ipcHandler';
import { app, BrowserWindow } from 'electron';
import path from 'path';
import url from 'url';
import installExtension, {
  REACT_DEVELOPER_TOOLS,
} from 'electron-devtools-installer'; //eslint-disable-line
import { referenceWindow } from './globals';
import { openTray } from './tray';
import './socketIO';

let window: Electron.BrowserWindow;
function createWindow() {
  window = new BrowserWindow({
    width: 1100,
    height: 700,
    backgroundColor: '#191622',
    webPreferences: {
      nodeIntegration: true,
    },
    kiosk: true,
  });

  if (process.env.NODE_ENV === 'development') {
    window.loadURL('http://localhost:4000');
  } else {
    window.loadURL(
      url.format({
        pathname: path.join(__dirname, 'renderer/index.html'),
        protocol: 'file:',
        slashes: true,
      })
    );
  }
  window.on('minimize', (e: Electron.Event) => {
    e.preventDefault();
    window.hide();
  });
  window.setMenu(null);
}

app
  .on('ready', createWindow)
  .whenReady()
  .then(() => {
    if (process.env.NODE_ENV === 'development') {
      installExtension(REACT_DEVELOPER_TOOLS)
        .then((name) => console.log(`Added Extension:  ${name}`))
        .catch((err) => {
          throw err;
        });
    }
    referenceWindow(window);
    openTray();
  });
