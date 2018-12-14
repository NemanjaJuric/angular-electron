"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var electron_1 = require("electron");
var path = require("path");
var url = require("url");
process.env['ELECTRON_DISABLE_SECURITY_WARNINGS'] = 'true';
var win;
var args = process.argv.slice(1);
var serve = args.some(function (val) { return val === '--serve'; });
function createWindow() {
    var size = electron_1.screen.getPrimaryDisplay().workAreaSize;
    var browserOptions = {
        x: size.width * 0.1,
        y: size.height * 0.05,
        width: size.width * 0.8,
        height: size.height * 0.9,
<<<<<<< HEAD
        transparent: true,
        frame: false,
    };
    win = new electron_1.BrowserWindow(browserOptions);
    // win.setMenu(null);
=======
        webPreferences: {
            webSecurity: false
        }
    };
    win = new electron_1.BrowserWindow(browserOptions);
    win.maximize();
>>>>>>> c1081fddf7fe0149f9959e58d4ea514c695f8a49
    if (serve) {
        require('electron-reload')(__dirname, {
            electron: require(__dirname + "/node_modules/electron")
        });
        win.loadURL('http://localhost:4200');
    }
    else {
        win.loadURL(url.format({
            pathname: path.join(__dirname, 'dist/index.html'),
            protocol: 'file:',
            slashes: true
        }));
    }
    win.on('closed', function () {
        // Dereference the window object, usually you would store window
        // in an array if your app supports multi windows, this is the time
        // when you should delete the corresponding element.
        win = null;
    });
}
try {
    // This method will be called when Electron has finished
    // initialization and is ready to create browser windows.
    // Some APIs can only be used after this event occurs.
    electron_1.app.on('ready', function () {
        createWindow();
    });
    // Quit when all windows are closed.
    electron_1.app.on('window-all-closed', function () {
        // On OS X it is common for applications and their menu bar
        // to stay active until the user quits explicitly with Cmd + Q
        if (process.platform !== 'darwin') {
            electron_1.app.quit();
        }
    });
    electron_1.app.on('activate', function () {
        // On OS X it's common to re-create a window in the app when the
        // dock icon is clicked and there are no other windows open.
        if (win === null) {
            createWindow();
        }
    });
}
catch (e) {
    throw e;
}
electron_1.ipcMain.on('full-screen', function (event, arg) {
    win.setFullScreen(arg);
});
electron_1.ipcMain.on('toggle', function (event, arg) {
    if (arg) {
        win.maximize();
    }
    else {
        win.unmaximize();
    }
});
electron_1.ipcMain.on('minimize', function (event, arg) {
    win.minimize();
});
electron_1.ipcMain.on('close', function (event, arg) {
    win.close();
});
electron_1.ipcMain.on('progress', function (event, args) {
    win.setProgressBar(args);
});
//# sourceMappingURL=main.js.map