import {AuthComponent} from '../../auth/containers/auth.component';
import {User} from '../models/user.model';
import {Component, OnInit} from '@angular/core';
import {AuthState} from '../../auth/models/state.model';
import {Store} from '@ngrx/store';

@Component({
  selector: 'app-auth',
  template: `<div class="page">
    <div class="page-single">
      <div class="container">
        <div class="row">
          <div class="col col-login mx-auto">
            <app-login-form (submitted)="login($event)"></app-login-form></div></div></div></div></div>`
})
export class UserAuthComponent extends AuthComponent<User> implements OnInit {

  constructor(protected _store: Store<AuthState<User>>) {
    super(_store);
  }

  ngOnInit(): void {
  }
}
