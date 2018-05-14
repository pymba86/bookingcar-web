import {ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

import {Car} from '../../models/car.model';

@Component({
  selector: 'app-cars-list-table',
  template: `
    <div class="card">
      <div class="card-header">
        <h3 class="card-title">Автомобили</h3>
        <div class="card-options">
          <a routerLink="/cars/create" class="btn btn-primary btn-sm">Добавить</a>
        </div>
      </div>
      <div class="table-responsive">
        <table class="table card-table table-vcenter text-nowrap">
          <thead>
          <tr>
            <th class="w-1">№</th>
            <th>Марка</th>
            <th class="w-1"></th>
            <th class="w-1"></th>
            <th class="w-1"></th>
          </tr>
          </thead>
          <tbody>
          <tr *ngFor="let car of cars">
            <td>
              <span class="text-muted">
               {{ car.id }}
              </span>
            </td>
            <td>
              {{ car.name }}
            </td>
            <td>
              <a class="icon" (click)="showDetails(car)">
                <i class="fe fe-eye"></i>
              </a>
            </td>
            <td>
              <a class="icon" (click)="editCar(car)">
                <i class="fe fe-edit"></i>
              </a>
            </td>
            <td>
              <a class="icon" (click)="deleteCar(car)">
                <i class="fe fe-trash"></i>
              </a>
            </td>
          </tr>
          </tbody>
        </table>
      </div>
    </div>
  `,
  styles: [],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CarsListTableComponent implements OnInit {

  @Input() cars: Car[];
  @Output() onEdit = new EventEmitter<Car>();
  @Output() onDelete = new EventEmitter<Car>();
  @Output() onShow = new EventEmitter<Car>();

  constructor() {
  }

  ngOnInit() {

  }


  showDetails(car: Car) {
    this.onShow.emit(car);
  }

  editCar(car: Car) {
    this.onEdit.emit(car);
  }

  deleteCar(car: Car) {
    this.onDelete.emit(car);
  }


}
