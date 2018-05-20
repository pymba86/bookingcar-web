import {CUSTOM_ELEMENTS_SCHEMA, NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';

import {SharedModule} from '@tabler/angular-core';
import {CarsActuatorListComponent} from './containers/cars-actuator-list.component';
import {CarsActuatorDetailComponent} from './containers/cars-actuator-detail.component';
import {CarsActuatorService} from './services/cars-actuator.service';
import {CarsActuatorRoutes} from './cars-actuator.routing.module';
import {CarsActuatorDialogComponent} from './containers/cars-actuator-dialog.component';


@NgModule({
  imports: [
    SharedModule,
    RouterModule.forChild(CarsActuatorRoutes)
  ],
  declarations: [CarsActuatorListComponent,
    CarsActuatorDialogComponent,
    CarsActuatorDetailComponent],
  providers: [CarsActuatorService],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})

export class CarsActuatorModule {
}
