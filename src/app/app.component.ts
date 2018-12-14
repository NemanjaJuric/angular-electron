import { Component } from '@angular/core';
import { ElectronService } from './services/electron.service';
import { WebApiService } from './services/web-api.service';
import { LocalStorageService } from './services/local-storage.service';
import { faCoffee, faTimes, faWindowMaximize, faWindowMinimize } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
})
export class AppComponent {

  constructor(
    private _electronService: ElectronService,
    private _webApiService: WebApiService,
    private _localStorageService: LocalStorageService
  ) { }

  faCoffee = faCoffee;
  faTimes = faTimes;
  faWindowMaximize = faWindowMaximize;
  faWindowMinimize = faWindowMinimize;

  fullScreenInd: boolean = false;

  fullScreen(flag: boolean) {
    this._electronService.ipcRenderer.send('full-screen', flag)
    let main = this._electronService.remote.require('./main')
    console.log(main)
  }

  toggle(){
    this.fullScreenInd = !this.fullScreenInd;
    this._electronService.ipcRenderer.send('toggle', this.fullScreenInd)
  }

  minimize(){
    this._electronService.ipcRenderer.send('minimize');
  }

  close(){
    this._electronService.ipcRenderer.send('close');
  }

  testData: any;
  // http://localhost:5000/api/first/test
  testHttp() {
    this._webApiService.get('http://localhost:5000/api/first/test', null, 'text')
      .subscribe(res => {
        this.testData = res;
      })
  }

  testHttpElectron(){
    this._electronService.ipcRenderer.send('get');
  }

  localStorageSet() {
    this._localStorageService.setItem('key', { name: 'Angular-Electron' })
  }

  localStorageItem: any;

  localStorageGet() {
    let item = this._localStorageService.getItem('key')
    this.localStorageItem = JSON.parse(item);
  }

}
