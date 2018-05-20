import {RouterModule, Routes} from '@angular/router';
import {LayoutBaseComponent, LayoutComponent} from '@tabler/angular-ui';
import {ModuleWithProviders} from '@angular/core';
import {CarsGearboxModule} from './cars-gearbox/cars-gearbox.module';
import {LocationModule} from './location/location.module';

export const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      {path: 'empty', children: []},
      {path: 'cars', loadChildren: './cars/cars.module#CarsModule'},
      {path: 'cars-gearbox', loadChildren: './cars-gearbox/cars-gearbox.module#CarsGearboxModule'},
      {path: 'cars-actuator', loadChildren: './cars-actuator/cars-actuator.module#CarsActuatorModule'},
      {path: 'cars-category', loadChildren: './cars-category/cars-category.module#CarsCategoryModule'},
      {path: 'cars-fuel', loadChildren: './cars-fuel/cars-fuel.module#CarsFuelModule'},
      {path: 'location', loadChildren: './location/location.module#LocationModule'},
      {path: '', redirectTo: 'cars',  pathMatch: 'full'}
    ]
  },
  {
    path: '',
    component: LayoutBaseComponent,
    children: [
      {path: '', loadChildren: './user/user.module#UserModule'},
      {path: '**', redirectTo: '/404?message=Invalid route'}
    ]
  }
  ];

export const AppRoutingModule: ModuleWithProviders = RouterModule.forRoot(routes);
