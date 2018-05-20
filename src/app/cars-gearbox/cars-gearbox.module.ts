import {CUSTOM_ELEMENTS_SCHEMA, NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';

import {SharedModule} from '@tabler/angular-core';
import {CarsGearboxRoutes} from './cars-gearbox.routing.module';
import {CarsGearboxListComponent} from './containers/cars-gearbox-list.component';
import {CarsGearboxService} from './services/cars-gearbox.service';
import {CarsGearboxDetailComponent} from './containers/cars-gearbox-detail.component';
import {CarsGearboxDialogComponent} from './containers/cars-gearbox-dialog.component';


@NgModule({
  imports: [
    SharedModule,
    RouterModule.forChild(CarsGearboxRoutes)
  ],
  declarations: [CarsGearboxListComponent, CarsGearboxDetailComponent, CarsGearboxDialogComponent],
  providers: [CarsGearboxService],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})

export class CarsGearboxModule {
}
