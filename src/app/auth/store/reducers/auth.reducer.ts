import {AuthState, initialState} from './auth.state';
import * as auth from '../actions/auth.actions';


export function reducer(state: AuthState = initialState, action: auth.AuthActions) {
  switch (action.type) {
    case auth.AuthActionType.Logout:
      return initialState;
    default:
      return state;
  }
}
