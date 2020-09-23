// eslint-disable-next-line
import { Menu, Tray } from 'electron';

let window: Electron.BrowserWindow;
let tray: Electron.Tray;

const referenceWindow = (_window: Electron.BrowserWindow): void => {
  window = _window;
};
const referenceTray = (_tray: Electron.Tray): void => {
  tray = _tray;
};

export { window, tray, referenceWindow, referenceTray };
