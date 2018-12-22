"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var electron_1 = require("electron");
var browser_options_1 = require("./browser-options");
var path = require("path");
var url = require("url");
exports.win = null;
var WindowBuilder = /** @class */ (function () {
    function WindowBuilder(serve) {
        this._serve = serve;
    }
    WindowBuilder.prototype.buildWindow = function () {
        exports.win = new electron_1.BrowserWindow(browser_options_1.BrowserOptions.options);
        exports.win.setMenu(null);
        if (this._serve) {
            require('electron-reload')(__dirname, {
                electron: require(path.join(__dirname, '../../node_modules/electron'))
            });
            exports.win.loadURL('http://localhost:4200');
        }
        else {
            exports.win.loadURL(url.format({
                pathname: path.join(__dirname, '../../dist/index.html'),
                protocol: 'file:',
                slashes: true
            }));
        }
        exports.win.on('closed', function () {
            exports.win = null;
        });
        return exports.win;
    };
    return WindowBuilder;
}());
exports.WindowBuilder = WindowBuilder;
//# sourceMappingURL=window-builder.js.map