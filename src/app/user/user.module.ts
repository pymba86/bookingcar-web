import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {HttpClientModule} from '@angular/common/http';
import {RouterModule} from '@angular/router';
import {EffectsModule} from '@ngrx/effects';
import {UserEffects} from './store/effects/user.effects';
import {UserAuthComponent} from './containers/user-auth.component';
import {UserAuthService} from './services/user-auth.service';
import {AuthModule} from '../auth/auth.module';


@NgModule({
  imports: [
    CommonModule,
    HttpClientModule,
    RouterModule,
    AuthModule,
    EffectsModule.forRoot([UserEffects])
  ],
  declarations: [
    UserAuthComponent
  ],
  providers: [
    UserAuthService
  ]
})
export class UserModule {
}
