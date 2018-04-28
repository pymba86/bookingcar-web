import {Injectable} from '@angular/core';
import {AuthEffects} from '../../../auth/store/effects/auth.effects';
import {User} from '../../models/user.model';
import {UserAuthService} from '../../services/user-auth.service';
import {Actions} from '@ngrx/effects';


@Injectable()
export class UserEffects extends AuthEffects<User> {
  public constructor(private _actions: Actions, private _service: UserAuthService) {
    super(_actions, _service);
  }
}
