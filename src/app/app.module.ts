import {BrowserModule} from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {NgModule} from '@angular/core';
import {AppRoutingModule} from './app.routing.module';
import {AppComponent} from './app.component';
import {CoreModule} from '@tabler/angular-core';
import {AppService} from './app.service';
import {HttpClientModule} from '@angular/common/http';
import {ProfileService} from './profiles/services/profile.service';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    CoreModule,
    AppRoutingModule,
  ],
  providers: [AppService, ProfileService],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor(app: AppService) {
    app.init();
  }
}
