import {AuthComponent} from '../../auth/containers/auth.component';
import {User} from '../models/user.model';
import {Component, OnInit} from '@angular/core';
import {AuthState} from '../../auth/models/state.model';
import {Store} from '@ngrx/store';

@Component({
  selector: 'app-auth',
  template: `<h4> User Authentication {{ isAuth }}</h4>`
})
export class UserAuthComponent extends AuthComponent<User> implements OnInit {

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
   // this.model.subscribe(model => this.user = model);
    this.isAuthenticated.subscribe(isAuthenticated => this.isAuth = isAuthenticated);
  }

}
