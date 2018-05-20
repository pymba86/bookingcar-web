import {Routes} from '@angular/router';
import {CarsCategoryDetailComponent} from './containers/cars-category-detail.component';
import {CarsCategoryListComponent} from './containers/cars-category-list.component';
import {CarsCategoryDialogComponent} from './containers/cars-category-dialog.component';

export const CarsCategoryRoutes: Routes = [
  {
    path: '',
    component: CarsCategoryListComponent,
  },
  {
    path: 'create',
    component: CarsCategoryDialogComponent,
  },
  {
    path: ':id/edit',
    component: CarsCategoryDialogComponent,
  },
  {
    path: ':id',
    component: CarsCategoryDetailComponent,
  }];
