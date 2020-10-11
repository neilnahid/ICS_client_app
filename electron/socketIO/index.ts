import { networkInterfaces } from 'os';
import io from 'socket.io-client';
import { closeTray, openTray } from '../tray';
import getValuesWithProperty from '../utils/extractKeyVal';
import { window } from '../globals';

const socket = io(process.env.SERVER_URI ?? 'http://localhost:3001');
const macAddresses: string[] = getValuesWithProperty(
  networkInterfaces(),
  'mac'
);
function authenticate(): void {
  if (socket.connected) socket.emit('authenticate', macAddresses);
  else socket.connect();
}
socket.on('connect', () => {
  authenticate();
});
socket.on('activate_PC', () => {
  closeTray();
  window.maximize();
});

socket.on('deactivate_PC', () => {
  openTray();
  window.minimize();
});

export { socket, authenticate };
