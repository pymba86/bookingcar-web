import {Action} from '@ngrx/store';
import {Auth} from '../../models/auth.model';

export const enum AuthActionType {
  Login = '[Auth] Login',
  LoginSuccess = '[Auth] Login Success',
  LoginFailure = '[Auth] Login Failure',
  Logout = '[Auth] Logout'
}

export class Login implements Action {
  readonly type = AuthActionType.Login;

  constructor(public payload: Auth) {
  }
}

export class LoginSuccess implements Action {
  readonly type = AuthActionType.LoginSuccess;

  constructor(public payload: { auth: Auth }) {
  }
}

export class LoginFailure implements Action {
  readonly type = AuthActionType.LoginFailure;

  constructor(public payload: { error: string }) {
  }
}

export class Logout implements Action {
  readonly type = AuthActionType.Logout;

  constructor(public payload: Auth) {
  }
}

export type AuthActions = | Login | LoginSuccess | LoginFailure | Logout;
