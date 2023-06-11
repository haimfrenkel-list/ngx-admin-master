import { Injectable } from '@angular/core';
import {
  HttpClient, HttpHeaders, HttpErrorResponse,
  HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpParams, HttpResponse, HttpEventType,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { delay, map, catchError } from 'rxjs/operators';
import { environment } from '../environment/environment';

@Injectable({
  providedIn: 'root',
})
// tslint:disable:max-line-length
// tslint:disable:no-console
export class ServerTokenService implements HttpInterceptor {

  constructor(private http: HttpClient) {
   }
  base_url = environment.apiUrl + '/'; //  'http://localhost:8080/api/'; // 'https://list-server-api.herokuapp.com/api/';
  authToken: String;

  setAuthToken(token: String) {    
    this.authToken = token;
  }
  getOptions(headers?: {}): {} {
    // this.httpOptions.headers.set('x-access-token', this.authService.currentUserSubject.token);
    headers = headers ? headers : {};
    headers['Content-Type'] =  'application/json';
    headers['x-access-token'] =  this.authToken || '';
    return {
      headers: new HttpHeaders(headers),
    };
  }

  getWithToken<T>(path: String, headers?: {}): Observable<T> {
    return this.http.get<T>(`${this.base_url}api/` + path, this.getOptions(headers));
  }

  postWithToken<T>(path: String, data: Object, headers?: {}): Observable<T> {    
    return this.http.post<T>(`${this.base_url}api/` + path, data, this.getOptions(headers));
  }

  putWithToken<T>(path: String, data: Object, headers?: {}): Observable<T> {
    return this.http.put<T>(`${this.base_url}api/` + path, data, this.getOptions(headers));
  }

  deleteWithToken<T>(path: String, headers?: {}): Observable<T> {
    return this.http.delete<T>(`${this.base_url}api/` + path, this.getOptions(headers));
  }

  postFileToAws<T>(filePath: String, data: {}, fileContent: File | Blob, fileName: string): Observable<AwsRespons> {
    const retObj = new Observable<AwsRespons>((observer) => {
      this.postWithToken('files/' + filePath, data).subscribe(res => {
        const obj = res['params'];
        const formData = new FormData();
        // tslint:disable-next-line:forin
        for (const key in obj) {
          formData.append(key, obj[key]);
        }
        formData.append('file', fileContent , fileName);
        const response: AwsRespons = {
          fileName: res['params']['key'],
          baseUrl: res['endpoint_url'],
        };
        formData.append('content-type', data['type']);

        // .replace("amazonaws.com", "us-west-2.amazonaws.com
        // tslint:disable-next-line:no-shadowed-variable
        this.http.post(res['endpoint_url'], formData, {responseType: 'text', observe: 'events', reportProgress: true }).subscribe(data => {
          switch(data.type) {
            case HttpEventType.UploadProgress:
              response.progress = Math.floor((data.loaded / data.total) * 100)
              response.done = false;
              observer.next(response);
              break;
            case HttpEventType.Response:
              response.done = true;
              observer.next(response);
              break;
          }
          // const keys = data.headers.keys();
          // const headers = keys.map(key =>
          //   `${key}: ${data.headers.get(key)}`);

          // observer.next(response);
        });
      }, err => {
        observer.error(err);
      });

    });
    return retObj;
  }

  downloadFile(url: string): Observable<Blob> {
    const opt = this.getOptions();
    opt['responseType'] = 'blob';
    return this.http.get<Blob>(this.base_url + 'api/files/downloadPdfFromHtml/' + encodeURIComponent(url), opt);
   }

  // intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
  //   return next.handle(request).pipe(
  //     map((event: HttpEvent<any>) => event), // pass further respone
  //     catchError((error: HttpErrorResponse) => {
  //       // here will be catched error from response, just check if its 401
  //       if (error && error.status == 401)
  //         // then logout e.g. this.authService.logout()
  //         return throwError(error);
  //     }));
  // }

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(req).pipe(
      catchError(
        err =>
          new Observable<HttpEvent<any>>(observer => {
            if (err instanceof HttpErrorResponse) {
              const errResp = <HttpErrorResponse>err;
              if (errResp.status === 401 || err.status === 403) {
                // this.authService.goToLogin();
              }
            }
            observer.error(err);
            observer.complete();
          }),
      ),
    );
  }
}

export interface  AwsRespons {
  fileName: string;
  baseUrl: string;
  progress?: number;
  done?: boolean;
}
