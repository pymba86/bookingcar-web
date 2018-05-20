import {Routes} from '@angular/router';
import {CarsGearboxListComponent} from './containers/cars-gearbox-list.component';
import {CarsGearboxDetailComponent} from './containers/cars-gearbox-detail.component';
import {CarsFuelDialogComponent} from '../cars-fuel/containers/cars-fuel-dialog.component';
import {CarsGearboxDialogComponent} from './containers/cars-gearbox-dialog.component';

export const CarsGearboxRoutes: Routes = [
  {
    path: '',
    component: CarsGearboxListComponent,
  },
  {
    path: 'create',
    component: CarsGearboxDialogComponent,
  },
  {
    path: ':id/edit',
    component: CarsGearboxDialogComponent,
  },
  {
    path: ':id',
    component: CarsGearboxDetailComponent,
  }];
