import {Actions, Effect, ofType} from '@ngrx/effects';
import {AuthService} from '../services/auth.service';
import {Auth} from '../models/auth.model';
import {AuthActionType, Login, LoginFailure, LoginSuccess} from './auth.actions';
import {of} from 'rxjs/observable/of';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/switchMap';
import {Action} from '@ngrx/store';
import 'rxjs/add/operator/map';

export abstract class AuthEffects<T extends Auth> {

  constructor(public actions: Actions,
              public authService: AuthService<T>) {
  }

  abstract success(auth: Action);
  abstract redirect(auth: Action);

  @Effect()
  login = this.actions
    .ofType(AuthActionType.Login)
    .map((action: Login) => action.payload)
    .switchMap(payload =>
      this.authService.login(payload)
        .map((model: T) => new LoginSuccess<T>(model))
        .catch((error) => of(new LoginFailure<T>(error)))
    );

  @Effect({dispatch: false})
  loginSuccess = this.actions
    .ofType(AuthActionType.LoginSuccess)
    .do(action => {
      this.success(action);
    });


  @Effect({ dispatch: false })
  LogInFailure = this.actions.pipe(
    ofType(AuthActionType.LoginFailure)
  );

  @Effect({dispatch: false})
  loginRedirect = this.actions
    .ofType(AuthActionType.Redirect)
    .do(action => {
      this.redirect(action);
    });
}
