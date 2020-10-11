import { ipcMain } from 'electron';
import { authenticate, socket } from './socketIO';

ipcMain.handle('disconnect', () => {
  socket.emit('disconnectPC');
});
ipcMain.handle('reconnect', () => {
  authenticate();
});
