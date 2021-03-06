import { BrowserWindow, BrowserWindowConstructorOptions, screen, Tray, Menu, app } from "electron";
import * as path from 'path';
import * as url from 'url';

export var win: BrowserWindow = null;

export class WindowBuilder {

    constructor(serve: boolean) {
        this._serve = serve;
    }

    private _serve: boolean;

    createWindow() {
        var size = screen.getPrimaryDisplay().workAreaSize;

        let browserOptions: BrowserWindowConstructorOptions = {
            x: size.width * 0.1,
            y: size.height * 0.05,
            width: size.width * 0.8,
            height: size.height * 0.9,
            show: false
        }

        win = new BrowserWindow(browserOptions);

        if (this._serve) {
            require('electron-reload')(__dirname, {
                electron: require(path.join(__dirname, '../../../node_modules/electron'))
            });
            win.loadURL('http://localhost:4200');
        } else {
            win.loadURL(url.format({
                pathname: path.join(__dirname, '../../../dist/index.html'),
                protocol: 'file:',
                slashes: true
            }));
            win.setMenu(null);
        }

        win.once('ready-to-show', () => {
            win.show()
          })

        win.on('closed', () => {
            win = null;
        });

        return win;
    }

    useSystemTray() {
        win.on('minimize', function (event) {
            event.preventDefault()
            win.hide()
        })

        win.on('show', function () {
            appIcon.setHighlightMode('always')
        })

        var iconpath = path.join(__dirname, '../../../dist/favicon.ico')
        var appIcon = new Tray(iconpath)
        var contextMenu = Menu.buildFromTemplate([
            {
                label: 'Show App', click: function () {
                    win.show()
                }
            },
            {
                label: 'Quit', click: function () {
                    app.quit()
                }
            }
        ])
        appIcon.setContextMenu(contextMenu);
        appIcon.on('click', function () {
            win.show();
        })
    }

}