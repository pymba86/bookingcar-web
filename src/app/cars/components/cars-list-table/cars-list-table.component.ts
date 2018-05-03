import {Component, Input, OnInit} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {Car} from '../../models/car.model';
import {Store} from '@ngrx/store';
import * as carsActions from '../../store/cars.actions';
import * as fromCars from '../../store';

@Component({
  selector: 'app-cars-list-table',
  template: `
    <div class="card">
      <div class="card-header">
        <h3 class="card-title">Автомобили</h3>
        <div class="card-options">
          <a href="#" class="btn btn-primary btn-sm">Добавить</a>
        </div>
      </div>
      <div class="table-responsive">
        <table class="table card-table table-vcenter text-nowrap">
          <thead>
          <tr>
            <th class="w-1">№</th>
            <th>Марка</th>
            <th></th>
            <th class="w-1"></th>
          </tr>
          </thead>
          <tbody>
          <tr *ngFor="let car of cars | async">
            <td>
              <span class="text-muted">
               {{ car.id }}
              </span>
            </td>
            <td>
              {{ car.name }}
            </td>
            <td class="text-right">
              <a routerLink="/cars/edit/{{ car.id }}" class="btn btn-secondary btn-sm">Manage</a>
              <div class="dropdown">
                <button class="btn btn-secondary btn-sm dropdown-toggle" data-toggle="dropdown">Actions</button>
              </div>
            </td>
            <td>
              <a class="icon" href="javascript:void(0)">
                <i class="fe fe-edit"></i>
              </a>
            </td>
          </tr>
          </tbody>
        </table>
      </div>
    </div>
  `,
  styles: [],
})
export class CarsListTableComponent implements OnInit {
  cars: Observable<Car[]>;

  constructor(public store: Store<fromCars.CarsState>) {
  }

  ngOnInit(): void {
    this.cars = this.store.select(fromCars.getAllCars);
    this.store.dispatch(new carsActions.LoadAll());
  }

}
