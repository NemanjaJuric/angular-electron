import { Component } from '@angular/core';
import { ElectronService } from './services/electron.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  
  constructor(
    private _electronService: ElectronService
  ){  }
  
  fullScreen(flag: boolean){
    this._electronService.ipcRenderer.send('full-screen', flag) 
  }

}
