import {AuthState} from '../../models/state.model';
import {AuthAction, AuthActionType} from '../actions/auth.actions';

export const initialState: AuthState<any> = {
  isAuthenticated: false,
  model: null
};

export function loginReducer(state: AuthState<any> = initialState, action: AuthAction<any>): AuthState<any> {
  switch (action.type) {
    case AuthActionType.LoginSuccess:
      return {
        ...state,
        isAuthenticated: true,
        model: action.payload
      };
    case AuthActionType.Logout:
      return initialState;
    default:
      return state;
  }
}

export const reducers = {
  auth: loginReducer
};
