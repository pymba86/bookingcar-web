import {Injectable} from '@angular/core';
import {Router} from '@angular/router';
import {Effect, Actions, ofType} from '@ngrx/effects';
import {AuthService} from '../../services/auth.service';
import {Auth} from '../../models/auth.model';
import {AuthActionType, Login, LoginFailure, LoginSuccess} from '../actions/auth.actions';
import {Observable} from 'rxjs/Observable';

@Injectable()
export class AuthEffect<T extends Auth> {

  constructor(private actions: Actions,
              private authService: AuthService<T>,
              private router: Router) {
  }

  @Effect()
  login = this.actions
    .ofType(AuthActionType.Login)
    .map((action: Login) => action.payload)
    .switchMap(payload => {
      return this.authService.login(payload)
        .map((auth) => {
          return new LoginSuccess({auth});
        })
        .catch((error) => {
          return Observable.of(new LoginFailure({error: error}));
        });
    });

  @Effect({dispatch: false})
  loginSuccess = this.actions
    .ofType(AuthActionType.LoginSuccess)
    .do(() => this.router.navigate(['/']));

  @Effect({dispatch: false})
  loginFailure = this.actions.pipe(ofType(AuthActionType.LoginFailure));
}
