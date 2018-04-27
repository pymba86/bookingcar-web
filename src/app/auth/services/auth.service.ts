import {Injectable} from '@angular/core';
import {HttpClient, HttpResponse} from '@angular/common/http';
import {Auth} from '../models/auth.model';
import {Observable} from 'rxjs/Observable';

@Injectable()
export class AuthService<T extends Auth> {

  constructor(private http: HttpClient) {
  }

  login(auth: Auth): Observable<T> {
    return this.http.post<T>('api/authentication', auth);
  }

  logout(): Observable<any> {
    return this.http.post('api/logout', {}, {observe: 'response'}).map((response: HttpResponse<any>) => {
      // TODO Получить новый токен csrf по api
      return response;
    });
  }
}
