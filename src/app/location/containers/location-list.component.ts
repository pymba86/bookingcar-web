import {Component, OnInit, OnDestroy} from '@angular/core';
import {HttpResponse, HttpErrorResponse} from '@angular/common/http';

import {CarLocation} from '../models/car-location.model';
import {CarLocationService} from '../services/location';

@Component({
  selector: 'app-location-list',
  template: `
    <ui-page>
      <div class="card">
        <div class="card-header">
          <h3 class="card-title">Станция</h3>
          <div class="card-options">
            <a routerLink="/location/create" class="btn btn-primary btn-sm">Добавить</a>
          </div>
        </div>
        <div class="table-responsive" *ngIf="locations">
          <table class="table card-table table-vcenter text-nowrap">
            <thead>
            <tr>
              <th class="w-1">№</th>
              <th>Название</th>
              <th>Адресс</th>
              <th>Телефон</th>
              <th class="w-1"></th>
              <th class="w-1"></th>
              <th class="w-1"></th>
            </tr>
            </thead>
            <tbody>
            <tr *ngFor="let location of locations">
              <td><span class="text-muted">{{ location.id }}</span></td>
              <td>{{ location.name }}</td>
              <td>{{ location.address }}</td>
              <td>{{ location.phone }}</td>
              <td>
                <a class="icon" [routerLink]="[location.id ]">
                  <i class="fe fe-eye"></i>
                </a>
              </td>
              <td>
                <a class="icon" [routerLink]="[location.id + '/edit' ]">
                  <i class="fe fe-edit"></i>
                </a>
              </td>
              <td>
                <a class="icon" (click)="delete(location.id)">
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
export class LocationListComponent implements OnInit {
  locations: CarLocation[];

  constructor(private carsActuatorService: CarLocationService) {
  }

  loadAll() {
    this.carsActuatorService.query().subscribe(
      (res: HttpResponse<CarLocation[]>) => {
        this.locations = res.body;
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
