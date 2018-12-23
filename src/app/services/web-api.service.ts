import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpErrorResponse, HttpRequest, HttpEventType } from '@angular/common/http';
import { catchError, map } from 'rxjs/operators';
import { throwError, Observable } from 'rxjs';
import { ElectronService } from './electron.service';

@Injectable({
  providedIn: 'root'
})
export class WebApiService {

  constructor(
    private _http: HttpClient,
    private _electronService: ElectronService
  ) { }

  get(url: string, params?: HttpParams, responseType: any = 'json'): Observable<any> {

    const request = new HttpRequest('GET', url, {
      params: params,
      responseType: responseType,
      reportProgress: true
    });

    return this._http.request(request)
      .pipe(
        map(event => {
          if (event.type === HttpEventType.DownloadProgress) {
            this._electronService.ipcRenderer.send('progress', event.loaded / event.total)
          }
          if (event.type === HttpEventType.Response) {
            let t = setTimeout(() => {
              this._electronService.ipcRenderer.send('progress', 0)
              clearTimeout(t);
            }, 1000);
            return event.body;
          }
        })
      )

  }

  post(url: string, body?: any) {
    return this._http.post(url, body)
      .pipe(
        catchError(this.handleError)
      );
  }

  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      console.error('An error occurred:', error.error.message);
    } else {
      console.error(`Backend returned code ${error.status}, body was: ${error.error}`);
    }
    return throwError('Something bad happened; please try again later.');
  };

}
