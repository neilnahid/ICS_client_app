import { networkInterfaces } from 'os';
import io from 'socket.io-client';
import { closeTray, openTray } from '../tray';
import getValuesWithProperty from '../utils/extractKeyVal';
import { window } from '../globals';

const socket = io(process.env.SERVER_URI ?? 'http://localhost:3000');
const macAddresses: string[] = getValuesWithProperty(
  networkInterfaces(),
  'mac'
);
socket.on('connect', () => {
  console.log('connected');
  socket.emit('authenticate', macAddresses);
});
socket.on('activate_PC', () => {
  closeTray();
  window.maximize();
  console.log('activated PC');
});

socket.on('deactivate_PC', () => {
  openTray();
  window.minimize();
  console.log('deactivated PC');
});
