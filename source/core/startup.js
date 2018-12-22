"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ipc_listener_1 = require("../listeners/ipc-listener");
var Startup = /** @class */ (function () {
    function Startup(applicationBuilder) {
        this.configure(applicationBuilder);
    }
    Startup.prototype.configure = function (app) {
        app.use(function () { return ipc_listener_1.IpcListener.start(); });
    };
    return Startup;
}());
exports.Startup = Startup;
//# sourceMappingURL=startup.js.map