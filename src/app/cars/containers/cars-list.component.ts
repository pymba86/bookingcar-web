import {Component, OnInit, OnDestroy} from '@angular/core';
import {HttpResponse, HttpErrorResponse} from '@angular/common/http';
import {CarsService} from '../services/cars.service';
import {Car} from '../models/car.model';

@Component({
  selector: 'app-cars-list',
  template: `
    <ui-page>
      <div class="card">
        <div class="card-header">
          <h3 class="card-title">Автомобиль</h3>
          <div class="card-options">
            <a routerLink="/cars/create" class="btn btn-primary btn-sm">Добавить</a>
          </div>
        </div>
        <div class="table-responsive" *ngIf="cars">
          <table class="table card-table table-vcenter text-nowrap">
            <thead>
            <tr>
              <th class="w-1">№</th>
              <th>Название</th>
              <th>Год</th>
              <th>Категория</th>
              <th>Локация</th>
              <th>Цена</th>
              <th class="w-1"></th>
              <th class="w-1"></th>
              <th class="w-1"></th>
            </tr>
            </thead>
            <tbody>
            <tr *ngFor="let car of cars">
              <td><span class="text-muted">{{ car.id }}</span></td>
              <td>{{ car.name }}</td>
              <td>{{car.productionYear}}</td>
              <td>
                <div *ngIf="car.category">
                  {{car.category?.name}}
                </div>
              </td>
              <td>
                <div *ngIf="car.location">
                  {{car.location?.name}}
                </div>
              </td>
              <td>{{car.price}}</td>
              <td>
                <a class="icon" [routerLink]="[car.id ]">
                  <i class="fe fe-eye"></i>
                </a>
              </td>
              <td>
                <a class="icon" [routerLink]="[car.id + '/edit' ]">
                  <i class="fe fe-edit"></i>
                </a>
              </td>
              <td>
                <a class="icon" (click)="delete(car.id)">
                  <i class="fe fe-trash"></i>
                </a>
              </td>
            </tr>
            </tbody>
          </table>
        </div>
      </div>
    </ui-page>
  `,
})
export class CarsListComponent implements OnInit {
  cars: Car[];

  constructor(private carsService: CarsService) {
  }

  loadAll() {
    this.carsService.query().subscribe(
      (res: HttpResponse<Car[]>) => {
        this.cars = res.body;
      },
      (res: HttpErrorResponse) => alert(res.message)
    );
  }

  ngOnInit() {
    this.loadAll();
  }

  delete(id: number) {
    this.carsService.delete(id);
  }

}
