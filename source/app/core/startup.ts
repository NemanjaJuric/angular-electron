import { ApplicationBuilder } from "./application-builder";
import { IpcListener } from "../listeners/ipc-listener";

export class Startup {

    constructor(applicationBuilder: ApplicationBuilder){
        this.configure(applicationBuilder)
    }

    configure(app: ApplicationBuilder) {
        app.use(() => IpcListener.start());
    }

}