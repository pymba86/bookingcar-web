import {Component, OnInit, OnDestroy} from '@angular/core';
import {HttpResponse, HttpErrorResponse} from '@angular/common/http';
import {CarFuel} from '../models/car-fuel.model';
import {CarsFuelService} from '../services/cars-fuel.service';

@Component({
  selector: 'app-cars-fuel-list',
  template: `
    <ui-page>
      <div class="card">
        <div class="card-header">
          <h3 class="card-title">Топливо</h3>
          <div class="card-options">
            <a routerLink="/cars-fuel/create" class="btn btn-primary btn-sm">Добавить</a>
          </div>
        </div>
        <div class="table-responsive" *ngIf="carFuels">
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
            <tr *ngFor="let carFuel of carFuels">
              <td><span class="text-muted">{{ carFuel.id }}</span></td>
              <td>{{ carFuel.name }}</td>
              <td>
                <a class="icon" [routerLink]="[carFuel.id ]">
                  <i class="fe fe-eye"></i>
                </a>
              </td>
              <td>
                <a class="icon" [routerLink]="[carFuel.id + '/edit' ]">
                  <i class="fe fe-edit"></i>
                </a>
              </td>
              <td>
                <a class="icon"
                        (click)="remove(carFuel.id)">
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
export class CarsFuelListComponent implements OnInit {
  carFuels: CarFuel[];

  constructor(private carsFuelService: CarsFuelService) {
  }

  loadAll() {
    this.carsFuelService.query().subscribe(
      (res: HttpResponse<CarFuel[]>) => {
        this.carFuels = res.body;
      },
      (res: HttpErrorResponse) => alert(res.message)
    );
  }

  ngOnInit() {
    this.loadAll();
  }

  remove(id: number) {
    this.carsFuelService.delete(id).subscribe(
      (res: HttpResponse<CarFuel[]>) => {
        this.carFuels = this.carFuels.filter(item => item.id !== id);
      },
      (res: HttpErrorResponse) => alert(res.message)
    );
  }

}
