import {AuthComponent} from '../../auth/containers/auth.component';
import {User} from '../models/user.model';
import {Component, OnInit} from '@angular/core';
import {AuthState} from '../../auth/models/state.model';
import {Store} from '@ngrx/store';

@Component({
  selector: 'app-auth',
  template: `
    <app-login-form (submitted)="login($event)"></app-login-form>`
})
export class UserAuthComponent extends AuthComponent<User> implements OnInit {

  constructor(protected _store: Store<AuthState<User>>) {
    super(_store);
  }

  ngOnInit(): void {
  }
}
