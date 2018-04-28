import {Injectable} from '@angular/core';
import {AuthEffects} from '../../../auth/store/effects/auth.effect';
import {User} from '../../models/user.model';
import {UserService} from '../../services/user.service';
import {Actions} from '@ngrx/effects';


@Injectable()
export class UserEffects extends AuthEffects<User> {
  public constructor(private _actions: Actions, private _service: UserService) {
    super(_actions, _service);
  }
}
