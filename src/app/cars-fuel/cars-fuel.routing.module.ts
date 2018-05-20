import {Routes} from '@angular/router';
import {CarsFuelDetailComponent} from './containers/cars-fuel-detail.component';
import {CarsFuelListComponent} from './containers/cars-fuel-list.component';
import {CarsCategoryDialogComponent} from '../cars-category/containers/cars-category-dialog.component';
import {CarsFuelDialogComponent} from './containers/cars-fuel-dialog.component';

export const CarsFuelRoutes: Routes = [
  {
    path: '',
    component: CarsFuelListComponent,
  },
  {
    path: 'create',
    component: CarsFuelDialogComponent,
  },
  {
    path: ':id/edit',
    component: CarsFuelDialogComponent,
  },
  {
    path: ':id',
    component: CarsFuelDetailComponent,
  }];
