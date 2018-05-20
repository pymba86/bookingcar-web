import {CUSTOM_ELEMENTS_SCHEMA, NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';

import {SharedModule} from '@tabler/angular-core';
import {LocationRoutes} from './location.routing.module';
import {LocationDetailComponent} from './containers/location-detail.component';
import {LocationListComponent} from './containers/location-list.component';
import {CarLocationService} from './services/location';
import {LocationDialogComponent} from './containers/location-dialog.component';


@NgModule({
  imports: [
    SharedModule,
    RouterModule.forChild(LocationRoutes)
  ],
  declarations: [LocationListComponent, LocationDetailComponent, LocationDialogComponent],
  providers: [CarLocationService],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})

export class LocationModule {
}
