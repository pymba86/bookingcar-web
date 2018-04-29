import {Action} from '@ngrx/store';
import {Auth} from '../models/auth.model';

export const enum AuthActionType {
  Login = '[Auth] Login',
  LoginSuccess = '[Auth] Login Success',
  LoginFailure = '[Auth] Login Failure',
  Logout = '[Auth] Logout',
  Redirect = '[Auth] Redirect'
}

export interface AuthAction<T extends Auth> extends Action {
  payload: T;
}

export class Login implements AuthAction<Auth> {
  readonly type = AuthActionType.Login;

  constructor(public payload: Auth) {
  }
}

export class Logout implements AuthAction<Auth> {
  readonly type = AuthActionType.Logout;

  constructor(public payload: Auth) {
  }
}

export class LoginRedirect implements AuthAction<Auth> {
  readonly type = AuthActionType.Redirect;

  constructor(public payload: Auth) {
  }
}

export class LoginSuccess<T extends Auth> implements AuthAction<T> {
  readonly type = AuthActionType.LoginSuccess;

  constructor(public payload: T) {
  }
}

export class LoginFailure<T extends Auth> implements AuthAction<T> {
  readonly type = AuthActionType.LoginFailure;

  constructor(public payload: T) {
  }
}
