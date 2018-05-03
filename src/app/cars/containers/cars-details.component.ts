import {ChangeDetectionStrategy, Component, OnDestroy, OnInit} from '@angular/core';
import {Store, ActionsSubject} from '@ngrx/store';
import {ActivatedRoute, Router} from '@angular/router';
import {Observable} from 'rxjs/Observable';
import * as carsActions from '../store/cars.actions';

import {Car} from '../models/car.model';
import * as fromCars from '../store';

@Component({
  selector: 'app-cars-details',
  template: `
    <ui-page>
      <app-cars-details-card
        [car]="car | async"
        (onEdit)="editContact($event)"
        (onDelete)="deleteContact($event)"
      ></app-cars-details-card>
    </ui-page>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CarsDetailsComponent implements OnInit {

  car: Observable<Car>;

  constructor(private store: Store<fromCars.CarsState>,
              private activatedRoute: ActivatedRoute,
              private router: Router) {
  }

  ngOnInit() {

    this.car = this.store.select(fromCars.getCurrentCar);

    this.activatedRoute.params.subscribe(params => {
      this.store.dispatch(new carsActions.Load(+params['id']));
    });

  }


  editContact(car: Car) {

    //this.store.dispatch(new carsActions.SetCurrentContactId(car.id));

    this.router.navigate(['/cars/edit', car.id]);

  }

  deleteContact(car: Car) {
    const r = confirm('Are you sure?');
    if (r) {
      //  this.store.dispatch(new carsActions.Delete(car.id));
    }
  }


}
