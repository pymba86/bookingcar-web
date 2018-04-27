import {CanActivate} from '@angular/router';
import {Store} from '@ngrx/store';

export class AuthGuard implements CanActivate {
  constructor(private store: Store<Auth.State>) {
  }
}
