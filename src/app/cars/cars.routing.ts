import { Routes } from '@angular/router';

import { CarsComponent } from './cars.component';

export const CarsRoutes: Routes = [{
  path: '',
  component: CarsComponent,
  data: {
    heading: 'Автомобили'
  }
}];
