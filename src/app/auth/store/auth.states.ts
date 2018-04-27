import * as auth from './reducers/auth.state';
import * as fromAuth from './reducers/auth.reducer';
import {createSelector, createFeatureSelector} from '@ngrx/store';


export interface AuthState {
  authState: auth.AuthState;
}

export const reducers = {
  auth: fromAuth.reducer
};

export const selectAuthState = createFeatureSelector<AuthState>('auth');
