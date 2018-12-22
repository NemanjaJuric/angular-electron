import { app } from 'electron';
import { WindowBuilder, win } from './window-builder';

export class ApplicationBuilder {

    constructor(args: Array<string>) {
        let serve = args.some(val => val === '--serve');
        this._windowBuilder = new WindowBuilder(serve);
    }

    private _windowBuilder: WindowBuilder;

    build() {
        try {
            app.on('ready', () => {
                this._windowBuilder.buildWindow();
            });
            app.on('window-all-closed', () => {
                if (process.platform !== 'darwin') {
                    app.quit();
                }
            });
            app.on('activate', () => {
                if (win === null) {
                    this._windowBuilder.buildWindow();
                }
            });
        } catch (e) {
            throw e;
        }
    }

    use(factory: Function) {
        factory();
    }

}