import { BrowserWindow } from "electron";
import { BrowserOptions } from "./browser-options";
import * as path from 'path';
import * as url from 'url';

export var win: BrowserWindow = null;

export class WindowBuilder {

    constructor(serve: boolean){
        this._serve = serve;
    }

    private _serve: boolean;

    buildWindow() {

        win = new BrowserWindow(BrowserOptions.options);
        win.setMenu(null);

        if (this._serve) {
            require('electron-reload')(__dirname, {
                electron: require(path.join(__dirname, '../../node_modules/electron'))
            });
            win.loadURL('http://localhost:4200');
        } else {
            win.loadURL(url.format({
                pathname: path.join(__dirname, '../../dist/index.html'),
                protocol: 'file:',
                slashes: true
            }));
        }

        win.on('closed', () => {
            win = null;
        });

        return win;

    }

}