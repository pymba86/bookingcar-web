import {ChangeDetectionStrategy, Component, OnDestroy, OnInit} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {Store} from '@ngrx/store';
import {ActivatedRoute} from '@angular/router';
import {Car} from '../models/car.model';
import * as carsActions from '../store/cars.actions';
import * as fromCars from '../store';

@Component({
  selector: 'app-cars-edit',
  template: `
    <ui-page>
      <div class="card">
        <div class="card-header">
        <h3 class="card-title">Редактирование</h3>
        <div class="card-options">
          <a routerLink="/cars" class="btn btn-primary btn-sm">Вернутся</a>
        </div>
        </div>
        <div class="card-body">
          <app-cars-form [car]="car | async" (onSubmit)="submitted($event)"> </app-cars-form>
        </div>
      </div>
    </ui-page>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CarsEditComponent implements OnInit {

  car: Observable<Car>;

  constructor(
    public store: Store<fromCars.CarsState>,
    private activatedRoute: ActivatedRoute

  ) { }

  ngOnInit() {

    this.car = this.store.select(fromCars.getCurrentCar);


    this.activatedRoute.params.subscribe(params => {
      this.store.dispatch(new carsActions.Load(+params['id']));
    });

  }

  submitted(car: Car) {
    this.store.dispatch(new carsActions.Patch(car));
  }

}
