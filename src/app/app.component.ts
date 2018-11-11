import { Component } from '@angular/core';
import { ElectronService } from './services/electron.service';
import { WebApiService } from './services/web-api.service';
import { LocalStorageService } from './services/local-storage.service';
import { faCoffee } from '@fortawesome/free-solid-svg-icons';

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

  fullScreen(flag: boolean) {
    this._electronService.ipcRenderer.send('full-screen', flag)
  }

  testData: any;

  testHttp() {
    this._webApiService.get('assets/data/data.json')
      .subscribe(res => {
        this.testData = res;
      })
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
