// eslint-disable-next-line
import { Menu, Tray } from 'electron';
import path from 'path';
import { tray, window, referenceTray } from './globals';
// eslint-disable-next-line
const image = require('./icons/hourglass.png');
const openTray = () => {
  const newTray = new Tray(path.join(__dirname, image?.default));
  const contextMenu = Menu.buildFromTemplate([
    {
      label: 'Open App',
      type: 'normal',
      click: () => {
        window.show();
      },
    },
    {
      label: 'logout',
      type: 'normal',
      click: () => {
        window.hide();
      },
    },
  ]);
  newTray.setToolTip('This is my application.');
  newTray.setContextMenu(contextMenu);
  referenceTray(newTray);
};
const closeTray = (): void => {
  if (tray !== undefined) tray.destroy();
};
export { openTray, closeTray };
