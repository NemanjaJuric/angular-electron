"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var electron_1 = require("electron");
var window_builder_1 = require("./window-builder");
var ApplicationBuilder = /** @class */ (function () {
    function ApplicationBuilder(args) {
        var serve = args.some(function (val) { return val === '--serve'; });
        this._windowBuilder = new window_builder_1.WindowBuilder(serve);
    }
    ApplicationBuilder.prototype.build = function () {
        var _this = this;
        try {
            electron_1.app.on('ready', function () {
                _this._windowBuilder.buildWindow();
            });
            electron_1.app.on('window-all-closed', function () {
                if (process.platform !== 'darwin') {
                    electron_1.app.quit();
                }
            });
            electron_1.app.on('activate', function () {
                if (window_builder_1.win === null) {
                    _this._windowBuilder.buildWindow();
                }
            });
        }
        catch (e) {
            throw e;
        }
    };
    ApplicationBuilder.prototype.use = function (factory) {
        factory();
    };
    return ApplicationBuilder;
}());
exports.ApplicationBuilder = ApplicationBuilder;
//# sourceMappingURL=application-builder.js.map