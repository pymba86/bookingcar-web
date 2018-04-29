import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {StoreModule} from '@ngrx/store';
import {LoginFormComponent} from './components/login-form/login-form.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {reducers} from './store/auth.reducer';
import {AuthGuard} from './services/auth-guard.service';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    StoreModule.forRoot(reducers),
  ],
  declarations: [
    LoginFormComponent
  ],
  exports: [
    LoginFormComponent
  ],
  providers: [
    AuthGuard
  ]
})
export class AuthModule {
}
