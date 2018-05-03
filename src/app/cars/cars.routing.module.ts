import {Routes} from '@angular/router';

import {CarsListComponent} from './containers/cars-list.component';
import {CarsListTableComponent} from './components/cars-list-table/cars-list-table.component';
import {CarsDetailsComponent} from './containers/cars-details.component';
import {CarsEditComponent} from './containers/cars-edit.component';

export const routes: Routes = [{
  path: '',
  component: CarsListComponent,
  children: [
    {path: '', component: CarsListTableComponent}
  ]
},
  {
    path: ':id',
    component: CarsDetailsComponent
  },
  {
    path: 'edit/:id',
    component: CarsEditComponent
  }
];
