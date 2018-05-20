import {CUSTOM_ELEMENTS_SCHEMA, NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';

import {SharedModule} from '@tabler/angular-core';
import {CarsFuelListComponent} from './containers/cars-fuel-list.component';
import {CarsFuelDetailComponent} from './containers/cars-fuel-detail.component';
import {CarsFuelService} from './services/cars-fuel.service';
import {CarsFuelRoutes} from './cars-fuel.routing.module';
import {CarsFuelDialogComponent} from './containers/cars-fuel-dialog.component';


@NgModule({
  imports: [
    SharedModule,
    RouterModule.forChild(CarsFuelRoutes)
  ],
  declarations: [CarsFuelListComponent, CarsFuelDetailComponent, CarsFuelDialogComponent],
  providers: [CarsFuelService],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})

export class CarsFuelModule {
}
