import {AuthComponent} from '../../auth/components/auth.component';
import {User} from '../models/user.model';
import {Component, OnInit} from '@angular/core';
import {AuthState} from '../../auth/models/state.model';
import {Store} from '@ngrx/store';
import {Observable} from 'rxjs/Observable';

@Component({
  selector: 'app-auth',
  template: `<h4> User Authentication {{ user.email}} and {{ isAuth }}</h4>`
})
export class UserComponent extends AuthComponent<User> implements OnInit {

  user: User;
  isAuth: boolean;

  constructor(protected _store: Store<AuthState<User>>) {
    super(_store);
  }

  ngOnInit(): void {

    const user: User = {
      username: 'user',
      password: 'user'
    };

    this.login(user);
    this.model.subscribe(model => this.user = model);
    this.isAuthenticated.subscribe(isAuthenticated => this.isAuth = isAuthenticated);
  }

}
