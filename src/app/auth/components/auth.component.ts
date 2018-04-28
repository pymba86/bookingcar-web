import {Auth} from '../models/auth.model';
import {createFeatureSelector, createSelector, Store} from '@ngrx/store';
import {AuthState} from '../models/state.model';
import {Component} from '@angular/core';
import {Login} from '../store/actions/auth.actions';

@Component({})
export abstract class AuthComponent<T extends Auth> {
  getFractalState = createFeatureSelector<AuthState<T>>('auth');
  getState = createSelector(this.getFractalState, (state: AuthState<T>) => state);
  getModel = createSelector(this.getFractalState, (state: AuthState<T>): T => state.model);
  getIsAuthenticated = createSelector(this.getFractalState, (state: AuthState<T>): boolean => state.isAuthenticated);

  model: Store<T> = this.store.select(this.getModel);
  state: Store<AuthState<T>> = this.store.select(this.getState);
  isAuthenticated: Store<boolean> = this.store.select(this.getIsAuthenticated);

  constructor(protected store: Store<AuthState<T>>) {
  }

  protected login(auth: Auth) {
    this.store.dispatch(new Login(auth));
  }
}
