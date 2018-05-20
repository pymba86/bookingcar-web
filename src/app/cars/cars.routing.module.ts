import {Routes} from '@angular/router';
import {CarsListComponent} from './containers/cars-list.component';
import {CarsDetailComponent} from './containers/cars-detail.component';
import {CarsDialogComponent} from './containers/cars-dialog.component';

export const CarsRoutes: Routes = [
  {
    path: '',
    component: CarsListComponent,
  },
  {
    path: 'create',
    component: CarsDialogComponent,
  },
  {
    path: ':id/edit',
    component: CarsDialogComponent,
  },
  {
    path: ':id',
    component: CarsDetailComponent,
  }
  ];
