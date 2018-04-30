import {Inject, Injectable} from '@angular/core';
import {CanActivate} from '@angular/router';
import {AuthState} from '../models/state.model';
import {createFeatureSelector, createSelector, Store} from '@ngrx/store';
import {Auth} from '../models/auth.model';
import {Observable} from 'rxjs/Observable';
import {LoginRedirect} from '../store/auth.actions';
import 'rxjs/add/operator/take';

@Injectable()
export class AuthGuard<T extends Auth> implements CanActivate {

  getFractalState = createFeatureSelector<AuthState<T>>('auth');
  getIsAuthenticated = createSelector(this.getFractalState, (state: AuthState<T>): boolean => state.isAuthenticated);
  public isAuthenticated: Store<boolean> = this.store.select(this.getIsAuthenticated);

  constructor(protected store: Store<AuthState<T>>) { }

  canActivate(): Observable<boolean> {
    return this.isAuthenticated.take(1).map(auth => {
      if (!auth) {
        this.store.dispatch(new LoginRedirect(null));
        return false;
      }
      return true;
    });
  }
}
