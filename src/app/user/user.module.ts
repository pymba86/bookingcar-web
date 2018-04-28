import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {HttpClientModule} from '@angular/common/http';
import {RouterModule} from '@angular/router';
import {StoreModule} from '@ngrx/store';
import {EffectsModule} from '@ngrx/effects';
import {UserEffects} from './store/effects/user.effects';
import {UserComponent} from './components/user.component';
import {UserService} from './services/user.service';
import {reducers} from '../auth/store/reducers/auth.reducer';


@NgModule({
  imports: [
    CommonModule,
    HttpClientModule,
    RouterModule,
    StoreModule.forRoot(reducers),
    EffectsModule.forRoot([UserEffects])
  ],
  declarations: [
    UserComponent
  ],
  providers: [
    UserService
  ]
})
export class UserModule {
}
