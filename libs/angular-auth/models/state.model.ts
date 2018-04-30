import {Auth} from './auth.model';

export interface AuthState<T extends Auth> {
  isAuthenticated: boolean;
  model: T;
}
