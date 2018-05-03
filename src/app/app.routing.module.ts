import {RouterModule, Routes} from '@angular/router';
import {LayoutBaseComponent, LayoutComponent} from '@tabler/angular-ui';
import {ModuleWithProviders} from '@angular/core';

export const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      {path: 'empty', children: []},
      {path: 'cars', loadChildren: './cars/cars.module#CarsModule'}
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
