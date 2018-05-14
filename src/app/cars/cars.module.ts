import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {routes} from './cars.routing.module';
import {StoreModule} from '@ngrx/store';
import * as fromCars from './store';
import {CarsEffects} from './store/cars.effects';
import {EffectsModule} from '@ngrx/effects';
import {CarsService} from './services/cars.service';
import {SharedModule} from '@tabler/angular-core';
import {HttpClientInMemoryWebApiModule} from 'angular-in-memory-web-api';
import {CarsListTableComponent} from './components/cars-list-table/cars-list-table.component';
import {CarsListComponent} from './containers/cars-list.component';
import {CarsDetailsCardComponent} from './components/cars-details-card/cars-details-card.component';
import {CarsDetailsComponent} from './containers/cars-details.component';
import {CarsEditComponent} from './containers/cars-edit.component';
import {CarsFormComponent} from './components/cars-form/cars-form.component';
import {CarsCreateComponent} from './containers/cars-create.component';
import { CarsData } from './data/cars.data';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  imports: [
    SharedModule,
    RouterModule.forChild(routes),
    StoreModule.forRoot(fromCars.reducers),
    EffectsModule.forRoot([CarsEffects]),
    HttpClientModule,
    HttpClientInMemoryWebApiModule.forRoot(CarsData)
  ],
  declarations: [
    CarsListTableComponent,
    CarsListComponent,
    CarsDetailsComponent,
    CarsCreateComponent,
    CarsDetailsCardComponent,
    CarsEditComponent,
    CarsFormComponent],
  providers: [CarsService]
})

export class CarsModule {
}
