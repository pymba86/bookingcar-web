import {Routes} from '@angular/router';
import {LocationListComponent} from './containers/location-list.component';
import {LocationDetailComponent} from './containers/location-detail.component';
import {LocationDialogComponent} from './containers/location-dialog.component';

export const LocationRoutes: Routes = [
  {
    path: '',
    component: LocationListComponent,
  },
  {
    path: 'create',
    component: LocationDialogComponent,
  },
  {
    path: ':id/edit',
    component: LocationDialogComponent,
  },
  {
    path: ':id',
    component: LocationDetailComponent,
  }];
