import {CUSTOM_ELEMENTS_SCHEMA, NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {CarsListComponent} from './containers/cars-list.component';
import {CarsService} from './services/cars.service';
import {CarsRoutes} from './cars.routing.module';
import {SharedModule} from '@tabler/angular-core';
import {CarsDetailComponent} from './containers/cars-detail.component';
import {CarsDialogComponent} from './containers/cars-dialog.component';
import {CarsCategoryService} from '../cars-category/services/cars-category.service';
import {CarsGearboxService} from '../cars-gearbox/services/cars-gearbox.service';
import {CarsActuatorService} from '../cars-actuator/services/cars-actuator.service';
import {CarsFuelService} from '../cars-fuel/services/cars-fuel.service';
import {CarLocationService} from '../location/services/location';


@NgModule({
  imports: [
    SharedModule,
    RouterModule.forChild(CarsRoutes)
  ],
  declarations: [CarsListComponent, CarsDetailComponent, CarsDialogComponent],
  providers: [CarsService, CarsCategoryService,
    CarsGearboxService, CarsActuatorService,
    CarsFuelService, CarLocationService],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})

export class CarsModule {
}
