import {BrowserModule} from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {NgModule} from '@angular/core';
import {AppRoutingModule} from './app.routing.module';
import {AppComponent} from './app.component';
import {CoreModule} from '@tabler/angular-core';
import {AppService} from './app.service';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    CoreModule,
    AppRoutingModule,
  ],
  providers: [AppService],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor(app: AppService) {
    app.init()
  }
}
