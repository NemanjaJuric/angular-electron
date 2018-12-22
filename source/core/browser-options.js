"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var electron_1 = require("electron");
var BrowserOptions = /** @class */ (function () {
    function BrowserOptions() {
    }
    Object.defineProperty(BrowserOptions, "options", {
        get: function () {
            var size = electron_1.screen.getPrimaryDisplay().workAreaSize;
            BrowserOptions._options = {
                x: size.width * 0.1,
                y: size.height * 0.05,
                width: size.width * 0.8,
                height: size.height * 0.9,
                transparent: true,
                frame: false,
            };
            return this._options;
        },
        enumerable: true,
        configurable: true
    });
    return BrowserOptions;
}());
exports.BrowserOptions = BrowserOptions;
//# sourceMappingURL=browser-options.js.map