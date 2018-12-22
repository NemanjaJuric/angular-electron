"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var application_builder_1 = require("./source/core/application-builder");
var startup_1 = require("./source/core/startup");
var Main = /** @class */ (function () {
    function Main() {
    }
    Main.prototype.createApplicationBuilder = function (args) {
        this._applicationBuilder = new application_builder_1.ApplicationBuilder(args);
        return this;
    };
    Main.prototype.useStartup = function (startup) {
        new startup_1.Startup(this._applicationBuilder);
        return this;
    };
    Main.prototype.build = function () {
        this._applicationBuilder.build();
        return this;
    };
    Main.main = function () {
        return new Main();
    };
    return Main;
}());
var args = process.argv.slice(1);
process.env['ELECTRON_DISABLE_SECURITY_WARNINGS'] = 'true';
Main
    .main()
    .createApplicationBuilder(args)
    .useStartup(startup_1.Startup)
    .build();
//# sourceMappingURL=main.js.map