import {ChangeDetectionStrategy, Component, OnDestroy, OnInit} from '@angular/core';
import {Store, ActionsSubject} from '@ngrx/store';
import {ActivatedRoute, Router} from '@angular/router';
import {Observable} from 'rxjs/Observable';
import * as carsActions from '../store/cars.actions';

import {Car} from '../models/car.model';
import * as fromCars from '../store';
import {ofType} from '@ngrx/effects';
import {filter} from 'rxjs/operators';
import {DeleteSuccess} from '../store/cars.actions';
import {Subscription} from 'rxjs/Subscription';

@Component({
  selector: 'app-cars-details',
  template: `
    <ui-page>
      <app-cars-details-card
        [car]="car | async"
        (onEdit)="editCar($event)"
        (onDelete)="deleteCar($event)"
      ></app-cars-details-card>
    </ui-page>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CarsDetailsComponent implements OnInit {

  car: Observable<Car>;
  redirectSub: Subscription;

  constructor(private store: Store<fromCars.CarsState>,
              private activatedRoute: ActivatedRoute,
              private router: Router,
              private actionsSubject: ActionsSubject) {
  }

  ngOnInit() {

    this.car = this.store.select(fromCars.getCurrentCar);

    // If the destroy effect fires, we check if the current id is the one being viewed, and redirect to index
    this.redirectSub = this.actionsSubject.pipe(
      ofType(carsActions.DELETE_SUCCESS),
      filter((action: DeleteSuccess) =>
        action.payload === +this.activatedRoute.snapshot.params['id'])
    ).subscribe(_ => this.router.navigate(['/cars']));

    this.redirectSub = this.actionsSubject.pipe(
      filter(action => action.type === carsActions.DELETE_SUCCESS),
    ).subscribe(
      _ => this.router.navigate(['/cars'])
    );

    this.activatedRoute.params.subscribe(params => {
      this.store.dispatch(new carsActions.Load(+params['id']));
    });

  }


  editCar(car: Car) {
    this.store.dispatch(new carsActions.SetCurrentCarId(car.id));
    this.router.navigate(['/cars/edit', car.id]);
  }

  deleteCar(car: Car) {
    const r = confirm('Вы уверены?');
    if (r) {
      this.store.dispatch(new carsActions.Delete(car.id));
    }
  }


}
