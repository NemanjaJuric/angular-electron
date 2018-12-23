import { ipcMain, Notification } from 'electron';
import { win } from '../core/window-builder';
const notifier = require('node-notifier');

export class IpcListener {

  static start() {

    ipcMain.on('full-screen', (event, arg) => {
      win.setFullScreen(arg)
    })

    ipcMain.on('toggle', (event, arg) => {
      if (arg) {
        win.maximize();
      } else {
        win.unmaximize();
      }
    })

    ipcMain.on('minimize', (event, arg) => {
      win.minimize();
    })

    ipcMain.on('close', (event, arg) => {
      win.close();
    })

    ipcMain.on('progress', (event, args) => {
      win.setProgressBar(args)
    })

    ipcMain.on('notification', (event, args) => {
      notifier.notify({
        title: 'Notification',
        message: 'Notification test'
      });
    })

  }

}