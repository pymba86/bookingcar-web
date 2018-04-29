import {Injectable} from '@angular/core';
import {User} from '../../models/user.model';
import {UserAuthService} from '../../services/user-auth.service';
import {Actions} from '@ngrx/effects';
import {Router} from '@angular/router';
import {Action} from '@ngrx/store';
import {AuthEffects} from '../../../auth/store/effects/auth.effects';


@Injectable()
export class UserEffects extends AuthEffects<User> {

  success(auth: Action) {
    this._router.navigate(['/']);
  }

  public constructor(private _actions: Actions, private _service: UserAuthService, private _router: Router) {
    super(_actions, _service);
  }


}
