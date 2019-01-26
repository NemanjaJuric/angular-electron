import { app } from 'electron';
import { WindowBuilder, win } from './window-builder';

export class ApplicationBuilder {

    constructor(args: Array<string>) {
        let serve = args.some(val => val === '--serve');
        this._windowBuilder = new WindowBuilder(serve);
    }

    private _windowBuilder: WindowBuilder;
    private _useSystemTray: boolean = false;

    build() {
        try {
            app.on('ready', () => {
                this._windowBuilder.createWindow();
                if(this._useSystemTray){
                    this._windowBuilder.useSystemTray();
                }
            });
            app.on('window-all-closed', () => {
                if (process.platform !== 'darwin') {
                    app.quit();
                }
            });
            app.on('activate', () => {
                if (win === null) {
                    this._windowBuilder.createWindow();
                }
            });
        } catch (e) {
            throw e;
        }
    }

    useSystemTray(){
        this._useSystemTray = true;
    }

    use(factory: Function) {
        factory();
    }

}