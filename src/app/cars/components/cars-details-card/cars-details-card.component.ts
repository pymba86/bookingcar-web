import {ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Car} from '../../models/car.model';


@Component({
  selector: 'app-cars-details-card',
  template: `
    <div class="card" *ngIf="car">
      <div class="card-header">
        Информация по автомобилю - {{ car.name }}
      </div>
      <div class="card-body">
        <p>Уникинальный идентификатор: <span class="badge badge-primary">{{car.id}}</span></p>
        <p>Модель: <span class="badge badge-primary">{{car.name}}</span></p>
      </div>
      <div class="card-footer text-muted">
      <span class="float-md-right ">
        <button (click)="onEdit.emit(car)" class="btn btn-sm btn-outline-warning"> Изменить</button>
        <button (click)="onDelete.emit(car)" class="btn btn-sm btn-outline-danger"> Удалить</button>
      </span>

      </div>
    </div>

  `,
  styles: [],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CarsDetailsCardComponent implements OnInit {

  @Input() car: Car;
  @Output() onEdit = new EventEmitter<Car>();
  @Output() onDelete = new EventEmitter<Car>();

  constructor() {
  }

  ngOnInit() {

  }

}
