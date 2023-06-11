import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { delay, map, catchError } from 'rxjs/operators';
import { environment } from '../environment/environment';


@Injectable({
  providedIn: 'root',
})


export class ServerService  {
  base_url = environment.apiUrl + '/'; // 'http://listserver.us-east-2.elasticbeanstalk.com/api/';
  // 'https://list-server-api.herokuapp.com/api/';
  // base_url = 'http://localhost:8080/api/'; // 'https://list-server-api.herokuapp.com/api/';
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'x-access-token': '',
    }),
  };

  constructor(private http: HttpClient) { }

  post<T>(path: String, data: Object): Observable <T>  {
    return this.http.post<T>(this.base_url  + path, data, this.httpOptions);
        // const a: MyObervable<T> = MyObervable;
  }

  put<T>(path: String, data: Object): Observable <T>  {
    return this.http.put<T>(this.base_url + 'api/' + path, data, this.httpOptions);
        // const a: MyObervable<T> = MyObervable;
  }
  get<T>(path: String): Observable<T> {
    return this.http.get<T>(this.base_url + 'api/' + path, this.httpOptions);
  }

}

class MyObervable <T> {
  baseObservable: Observable<T>;
  error: Function;
}
