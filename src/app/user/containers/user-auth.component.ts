import {AuthComponent} from '../../auth/containers/auth.component';
import {User} from '../models/user.model';
import {Component, OnInit} from '@angular/core';
import {AuthState} from '../../auth/models/state.model';
import {Store} from '@ngrx/store';

@Component({
  selector: 'ui-pages-auth',
  template: `
    <div class="page-single">
      <div class="container">
        <div class="row">
          <div class="col {{ colClass }} mx-auto">
            <app-login-form (submitted)="login($event)"></app-login-form>
          </div>
        </div>
      </div>
    </div>`
})
export class UserAuthComponent extends AuthComponent<User> implements OnInit {

  public colClass = 'col-login';

  constructor(protected _store: Store<AuthState<User>>) {
    super(_store);
  }

  ngOnInit(): void {
  }
}
