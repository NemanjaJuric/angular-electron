import { Component } from '@angular/core';
import { ElectronService } from './services/electron.service';
import { faTimes, faWindowMaximize, faWindowMinimize } from '@fortawesome/free-solid-svg-icons';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
})
export class AppComponent {

  constructor(
    private _electronService: ElectronService,
    private _http: HttpClient
  ) { }

  faTimes = faTimes;
  faWindowMaximize = faWindowMaximize;
  faWindowMinimize = faWindowMinimize;

  fullScreenInd: boolean = false;

  test() {
    this._http.get('http://localhost:8080/api/first/test')
      .subscribe(res => {
        console.log(res)
      })
  }

  notification() {
    this._electronService.ipcRenderer.send('notification')
  }

  fullScreen(flag: boolean) {
    this._electronService.ipcRenderer.send('full-screen', flag)
  }

  toggle() {
    this.fullScreenInd = !this.fullScreenInd;
    this._electronService.ipcRenderer.send('toggle', this.fullScreenInd)
  }

  minimize() {
    this._electronService.ipcRenderer.send('minimize');
  }

  close() {
    this._electronService.ipcRenderer.send('close');
  }


}
