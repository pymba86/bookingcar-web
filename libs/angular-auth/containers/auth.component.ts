import {Auth} from '../models/auth.model';
import {createFeatureSelector, createSelector, Store} from '@ngrx/store';
import {AuthState} from '../models/state.model';
import {Login} from '../store/auth.actions';


export abstract class AuthComponent<T extends Auth> {
  getFractalState = createFeatureSelector<AuthState<T>>('auth');
  getState = createSelector(this.getFractalState, (state: AuthState<T>) => state);
  getModel = createSelector(this.getFractalState, (state: AuthState<T>): T => state.model);
  getIsAuthenticated = createSelector(this.getFractalState, (state: AuthState<T>): boolean => state.isAuthenticated);

  public model: Store<T> = this.store.select(this.getModel);
  public state: Store<AuthState<T>> = this.store.select(this.getState);
  public isAuthenticated: Store<boolean> = this.store.select(this.getIsAuthenticated);

  constructor(protected store: Store<AuthState<T>>) {
  }

  login(auth: Auth) : void {
    this.store.dispatch(new Login(auth));
  }
}
