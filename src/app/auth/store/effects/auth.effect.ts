import {Injectable} from '@angular/core';
import {Effect, Actions, ofType} from '@ngrx/effects';
import {AuthService} from '../../services/auth.service';
import {Auth} from '../../models/auth.model';
import {AuthActionType, Login, LoginFailure, LoginSuccess} from '../actions/auth.actions';
import { of } from 'rxjs/observable/of';
import {tap} from 'rxjs/operators';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import 'rxjs/operator/switchMap';

@Injectable()
export class AuthEffects<T extends Auth> {

  constructor(private actions: Actions,
              private authService: AuthService<T>) {
  }

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
  loginSuccess = this.actions.pipe(
    ofType(AuthActionType.LoginSuccess),
    tap((user) => {
      console.log(user);
    })
  );

  @Effect({ dispatch: false })
  LogInFailure = this.actions.pipe(
    ofType(AuthActionType.LoginFailure)
  );
}
