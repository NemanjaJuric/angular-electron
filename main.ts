import { ApplicationBuilder } from './source/app/core/application-builder';
import { Startup } from './source/app/core/startup';

class Main {

  constructor() {}

  private _applicationBuilder: ApplicationBuilder;

  createApplicationBuilder(args: Array<string>){
    this._applicationBuilder = new ApplicationBuilder(args);
    return this;
  }

  useStartup(startup: typeof Startup) {
    new Startup(this._applicationBuilder);
    return this;
  }

  build() {
    this._applicationBuilder.build();
    return this;
  }

  static main(){
    return new Main();
  }

}

var args = process.argv.slice(1);
process.env['ELECTRON_DISABLE_SECURITY_WARNINGS'] = 'true';

Main
  .main()
  .createApplicationBuilder(args)
  .useStartup(Startup)
  .build()