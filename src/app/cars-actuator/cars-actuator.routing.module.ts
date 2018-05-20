import {Routes} from '@angular/router';
import {CarsActuatorListComponent} from './containers/cars-actuator-list.component';
import {CarsActuatorDetailComponent} from './containers/cars-actuator-detail.component';
import {CarsActuatorDialogComponent} from './containers/cars-actuator-dialog.component';

export const CarsActuatorRoutes: Routes = [
  {
    path: '',
    component: CarsActuatorListComponent,
  },
  {
    path: 'create',
    component: CarsActuatorDialogComponent,
  },
  {
    path: ':id/edit',
    component: CarsActuatorDialogComponent,
  },
  {
    path: ':id',
    component: CarsActuatorDetailComponent,
  }];
