import {Action} from '@ngrx/store';
import {Auth} from '../../models/auth.model';

// -----------------------------------------------------------------------------
/**
 * Store  - это контейнер с контролируемым состоянием, предназначенный для
 *          написания исполняемых, согласованных приложений поверх Углового. Основные принципы:
 * State  - единая, неизменная структура данных.
 * Action - описывают изменения состояния.
 * Reducer - принимают предыдущее состояние и следующее действие для вычисления нового состояния.
 * Государство обращается с Store наблюдаемым государством и наблюдателем за действиями.
 */
// ------------------------------------------------------------------------------

/**
 * Варианты изменения состояний в аунтификации
 */
export const enum AuthActionType {
  Login = '[Auth] Login',
  LoginSuccess = '[Auth] Login Success',
  LoginFailure = '[Auth] Login Failure',
  Logout = '[Auth] Logout'
}

/**
 * Вход в систему
 */
export class Login implements Action {
  readonly type = AuthActionType.Login;
  constructor(public payload: Auth) {}
}

/**
 * Выход из системы
 */
export class Logout implements Action {
  readonly type = AuthActionType.Logout;
  constructor(public payload: Auth) {}
}
