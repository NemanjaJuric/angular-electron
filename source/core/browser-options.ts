import { BrowserWindowConstructorOptions, screen } from "electron";

export class BrowserOptions {

    private static _options: BrowserWindowConstructorOptions;
    
    public static get options(): BrowserWindowConstructorOptions {

        var size = screen.getPrimaryDisplay().workAreaSize;

        BrowserOptions._options = {
            x: size.width * 0.1,
            y: size.height * 0.05,
            width: size.width * 0.8,
            height: size.height * 0.9,
            transparent: true,
            frame: false,
        } 

        return this._options;
    }

}
