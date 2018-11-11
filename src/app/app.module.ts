import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ElectronService } from './services/electron.service';
import { ElectronViewDirective } from './directives/electron-view.directive';
import { WebApiService } from './services/web-api.service';
import { LocalStorageService } from './services/local-storage.service';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { WebviewDirective } from './directives/webview.directive';

@NgModule({
  declarations: [
    AppComponent,
    ElectronViewDirective,
    WebviewDirective
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production }),
    FontAwesomeModule
  ],
  providers: [
    ElectronService,
    WebApiService,
    LocalStorageService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
