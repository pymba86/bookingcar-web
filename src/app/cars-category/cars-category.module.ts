import {CUSTOM_ELEMENTS_SCHEMA, NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';

import {SharedModule} from '@tabler/angular-core';
import {CarsCategoryRoutes} from './cars-category.routing.module';
import {CarsCategoryListComponent} from './containers/cars-category-list.component';
import {CarsCategoryDetailComponent} from './containers/cars-category-detail.component';
import {CarsCategoryService} from './services/cars-category.service';
import {CarsCategoryDialogComponent} from './containers/cars-category-dialog.component';


@NgModule({
  imports: [
    SharedModule,
    RouterModule.forChild(CarsCategoryRoutes)
  ],
  declarations: [CarsCategoryListComponent, CarsCategoryDetailComponent, CarsCategoryDialogComponent],
  providers: [CarsCategoryService],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})

export class CarsCategoryModule {
}
