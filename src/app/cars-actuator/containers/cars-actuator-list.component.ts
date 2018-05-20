import {Component, OnInit, OnDestroy} from '@angular/core';
import {HttpResponse, HttpErrorResponse} from '@angular/common/http';
import {CarActuator} from '../models/cars-actuator.model';
import {CarsActuatorService} from '../services/cars-actuator.service';

@Component({
  selector: 'app-cars-actuator-list',
  template: `
    <ui-page>
      <div class="card">
        <div class="card-header">
          <h3 class="card-title">Привод</h3>
          <div class="card-options">
            <a routerLink="/cars-actuator/create" class="btn btn-primary btn-sm">Добавить</a>
          </div>
        </div>
        <div class="table-responsive" *ngIf="carCategories">
          <table class="table card-table table-vcenter text-nowrap">
            <thead>
            <tr>
              <th class="w-1">№</th>
              <th>Название</th>
              <th class="w-1"></th>
              <th class="w-1"></th>
              <th class="w-1"></th>
            </tr>
            </thead>
            <tbody>
            <tr *ngFor="let carActuator of carCategories">
              <td><span class="text-muted">{{ carActuator.id }}</span></td>
              <td>{{ carActuator.name }}</td>
              <td>
                <a class="icon" [routerLink]="[carActuator.id ]">
                  <i class="fe fe-eye"></i>
                </a>
              </td>
              <td>
                <a class="icon" [routerLink]="[carActuator.id + '/edit' ]">
                  <i class="fe fe-edit"></i>
                </a>
              </td>
              <td>
                <a class="icon" (click)="delete(carActuator.id)">
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
export class CarsActuatorListComponent implements OnInit {
  carCategories: CarActuator[];

  constructor(private carsActuatorService: CarsActuatorService) {
  }

  loadAll() {
    this.carsActuatorService.query().subscribe(
      (res: HttpResponse<CarActuator[]>) => {
        this.carCategories = res.body;
      },
      (res: HttpErrorResponse) => alert(res.message)
    );
  }

  ngOnInit() {
    this.loadAll();
  }

  delete(id: number) {
    this.carsActuatorService.delete(id);
  }

}
