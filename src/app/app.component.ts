import { Component } from '@angular/core';
import { ElectronService } from './services/electron.service';
import { faTimes, faWindowMaximize, faWindowMinimize } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
})
export class AppComponent {

  constructor(
    private _electronService: ElectronService,
  ) { }

  faTimes = faTimes;
  faWindowMaximize = faWindowMaximize;
  faWindowMinimize = faWindowMinimize;

  fullScreenInd: boolean = false;

  notification(){
    this._electronService.ipcRenderer.send('notification')
  }

  fullScreen(flag: boolean) {
    this._electronService.ipcRenderer.send('full-screen', flag)
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

  
}
