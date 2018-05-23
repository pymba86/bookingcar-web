import {BrowserModule} from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {Injector, NgModule} from '@angular/core';
import {AppRoutingModule} from './app.routing.module';
import {AppComponent} from './app.component';
import {CoreModule} from '@tabler/angular-core';
import {AppService} from './app.service';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {ProfileService} from './profiles/services/profile.service';
import {NotificationInterceptor} from './notification/notification.interceptor';
import {NotificationModule} from './notification/notification.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    CoreModule,
    NotificationModule,
    AppRoutingModule,
  ],
  providers: [AppService, ProfileService, {
    provide: HTTP_INTERCEPTORS,
    useClass: NotificationInterceptor,
    multi: true
  }],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor(app: AppService) {
    app.init();
  }
}
