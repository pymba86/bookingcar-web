import {Routes} from '@angular/router';

import {CarsListComponent} from './containers/cars-list.component';
import {CarsDetailsComponent} from './containers/cars-details.component';
import {CarsEditComponent} from './containers/cars-edit.component';
import {CarsCreateComponent} from './containers/cars-create.component';

export const routes: Routes = [
  {
    path: '',
    component: CarsListComponent
  },
  {
    path: 'detail/:id',
    component: CarsDetailsComponent,
    pathMatch: 'full',
  },
  {
    path: 'create',
    component: CarsCreateComponent,
    pathMatch: 'full',
  },
  {
    path: 'edit/:id',
    component: CarsEditComponent,
    pathMatch: 'full',
  }
];
