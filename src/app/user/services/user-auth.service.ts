import {Observable} from 'rxjs/Observable';
import {HttpClient, HttpResponse} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Auth} from '../../auth/models/auth.model';
import {AuthService} from '../../auth/services/auth.service';
import {User} from '../models/user.model';
import { of } from 'rxjs/observable/of';
import { _throw } from 'rxjs/observable/throw';


@Injectable()
export class UserAuthService implements AuthService<User> {

  constructor(protected http: HttpClient) {
  }

  login(auth: Auth): Observable<User> {
    if (auth.username !== 'user') {
      return _throw('Invalid username or password');
    }
    return of({username: 'user', password: 'user', email: 'user@test.ru'});
    //  return this.http.post<User>('api/authentication', auth);
  }
}
