import {Component, OnInit} from '@angular/core';
import * as fromCars from '../store';
import {Delete, SetCurrentCarId} from '../store/cars.actions';
import {Car} from '../models/car.model';
import {Store} from '@ngrx/store';
import {Observable} from 'rxjs/Observable';
import {Router} from '@angular/router';

@Component({
  selector: 'app-cars-list',
  template: `
    <ui-page>
      <app-cars-list-table [cars]="this.cars | async"
                           (onShow)="showCar($event)"
                           (onEdit)="editCar($event)"
                           (onDelete)="deleteCar($event)"></app-cars-list-table>
    </ui-page>
  `,
})
export class CarsListComponent implements OnInit {

  cars: Observable<Car[]>;

  constructor(public store: Store<fromCars.CarsState>, private router: Router) {
  }

  ngOnInit(): void {
    this.cars = this.store.select(fromCars.getAllCars);
  }

  editCar(car: Car) {
    this.store.dispatch(new SetCurrentCarId(car.id));
    this.router.navigate(['/cars', 'edit', car.id]);
  }

  showCar(car: Car) {
    this.store.dispatch(new SetCurrentCarId(car.id));
    this.router.navigate(['/cars/detail', car.id]);
  }

  deleteCar(car: Car) {
    const r = confirm('Вы уверены?');
    if (r) {
      this.store.dispatch(new Delete(car.id));
    }
  }
}
