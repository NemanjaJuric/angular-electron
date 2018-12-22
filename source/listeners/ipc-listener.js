"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var electron_1 = require("electron");
var window_builder_1 = require("../core/window-builder");
var IpcListener = /** @class */ (function () {
    function IpcListener() {
    }
    IpcListener.start = function () {
        electron_1.ipcMain.on('full-screen', function (event, arg) {
            window_builder_1.win.setFullScreen(arg);
        });
        electron_1.ipcMain.on('toggle', function (event, arg) {
            if (arg) {
                window_builder_1.win.maximize();
            }
            else {
                window_builder_1.win.unmaximize();
            }
        });
        electron_1.ipcMain.on('minimize', function (event, arg) {
            window_builder_1.win.minimize();
        });
        electron_1.ipcMain.on('close', function (event, arg) {
            window_builder_1.win.close();
        });
        electron_1.ipcMain.on('progress', function (event, args) {
            window_builder_1.win.setProgressBar(args);
        });
    };
    return IpcListener;
}());
exports.IpcListener = IpcListener;
//# sourceMappingURL=ipc-listener.js.map