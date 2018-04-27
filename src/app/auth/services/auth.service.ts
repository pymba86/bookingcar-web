import {Injectable} from '@angular/core';
import {HttpClient, HttpResponse} from '@angular/common/http';
import {Auth} from '../models/auth.model';
import {Observable} from 'rxjs/Observable';

/**
 * Сервис для аунтификации пользователя
 */
@Injectable()
export class AuthService<T extends Auth> {

  /**
   * Аунтификация пользователя по http клиенту
   * @param {HttpClient} http
   */
  constructor(private http: HttpClient) {
  }

  /**
   * Вход в систему
   * @param {Auth} auth Минимальная модель пользователя
   * @returns {Observable<T extends Auth>} Пользователь
   */
  login(auth: Auth): Observable<T> {
    return this.http.post<T>('api/authentication', auth);
  }

  /**
   * Выход из системы
   * @returns {Observable<any>} Ответ от сервера
   */
  logout(): Observable<any> {
    return this.http.post('api/logout', {}, {observe: 'response'}).map((response: HttpResponse<any>) => {
      // TODO Получить новый токен csrf по api
      return response;
    });
  }
}
