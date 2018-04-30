import {Injectable} from '@angular/core';
import {AuthEffects} from '../../../auth/store/auth.effects';
import {User} from '../../models/user.model';
import {UserAuthService} from '../../services/user-auth.service';
import {Actions} from '@ngrx/effects';
import {AuthAction} from '../../../auth/store/auth.actions';
import {Router} from '@angular/router';


@Injectable()
export class UserEffects extends AuthEffects<User> {

  redirect(auth: AuthAction<User>) {
    this._router.navigate(['/error']);
  }

  success(auth: AuthAction<User>) {
    this._router.navigate(['/']);
  }

  public constructor(private _actions: Actions, private _service: UserAuthService, private _router: Router) {
    super(_actions, _service);
  }


}
