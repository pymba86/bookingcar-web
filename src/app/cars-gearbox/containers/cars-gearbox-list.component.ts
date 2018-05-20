import {Component, OnInit, OnDestroy} from '@angular/core';
import {HttpResponse, HttpErrorResponse} from '@angular/common/http';
import {CarGearbox} from '../models/car-gearbox.model';
import {CarsGearboxService} from '../services/cars-gearbox.service';

@Component({
  selector: 'app-cars-gearbox-list',
  template: `
    <ui-page>
      <div class="card">
        <div class="card-header">
          <h3 class="card-title">Коробка передач</h3>
          <div class="card-options">
            <a routerLink="/cars-gearbox/create" class="btn btn-primary btn-sm">Добавить</a>
          </div>
        </div>
        <div class="table-responsive" *ngIf="carGearboxes">
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
            <tr *ngFor="let carGearbox of carGearboxes">
              <td><span class="text-muted">{{ carGearbox.id }}</span></td>
              <td>{{ carGearbox.name }}</td>
              <td>
                <a class="icon" [routerLink]="[carGearbox.id ]">
                  <i class="fe fe-eye"></i>
                </a>
              </td>
              <td>
                <a class="icon" [routerLink]="[carGearbox.id + '/edit' ]">
                  <i class="fe fe-edit"></i>
                </a>
              </td>
              <td>
                <a class="icon" (click)="delete(carGearbox.id)">
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
export class CarsGearboxListComponent implements OnInit {
  carGearboxes: CarGearbox[];

  constructor(private carsGearboxService: CarsGearboxService) {
  }

  loadAll() {
    this.carsGearboxService.query().subscribe(
      (res: HttpResponse<CarGearbox[]>) => {
        this.carGearboxes = res.body;
      },
      (res: HttpErrorResponse) => alert(res.message)
    );
  }

  ngOnInit() {
    this.loadAll();
  }

  delete(id: number) {
    this.carsGearboxService.delete(id);
  }

}
