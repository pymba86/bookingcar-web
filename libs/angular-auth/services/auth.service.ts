import {Auth} from '../models/auth.model';
import {Observable} from 'rxjs/Observable';

export interface AuthService<T extends Auth> {
  login(auth: Auth): Observable<T>;
}
