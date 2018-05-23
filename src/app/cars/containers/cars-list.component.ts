import {Component, OnInit, OnDestroy} from '@angular/core';
import {HttpResponse, HttpErrorResponse} from '@angular/common/http';
import {CarsService} from '../services/cars.service';
import {Car} from '../models/car.model';
import {Router} from '@angular/router';
import {Subscription} from 'rxjs/Subscription';
import {NotificationService} from '../../notification/notification.service';
import {Notification} from '../../notification/notification.model';
import {CarFuel} from '../../cars-fuel/models/car-fuel.model';

@Component({
  selector: 'app-cars-list',
  template: `
    <ui-page>
      <ui-card
        (action)="handleAction($event)"
        [header]="card.header"
        [buttons]="card.buttons"
        [alert]="notification">
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
                <a class="icon" (click)="remove(car.id)">
                  <i class="fe fe-trash"></i>
                </a>
              </td>
            </tr>
            </tbody>
          </table>
        </div>
      </ui-card>
    </ui-page>
  `,
})
export class CarsListComponent implements OnInit {
  notification: Notification;
  subscription: Subscription;

  cars: Car[];
  card = {
    header: 'Автомобиль',
    buttons: [
      {
        text: 'Добавить',
        type: 'button',
        action: 'add',
        payload: 'ADD_PAYLOAD'
      }
    ]
  };


  constructor(private carsService: CarsService,
              private router: Router,
              private notificationService: NotificationService) {
    this.notification = this.notificationService.get();
    this.subscription = this.notificationService.event
      .subscribe((notification) => {
        this.notification = notification;
      });
  }

  loadAll() {
    this.carsService.query().subscribe(
      (res: HttpResponse<Car[]>) => {
        this.cars = res.body;
      },
      (res: HttpErrorResponse) => this.notificationService.error(res.message)
    );
  }

  ngOnInit() {
    this.loadAll();
  }

  remove(id: number) {
    this.carsService.delete(id).subscribe(
      (res: HttpResponse<CarFuel[]>) => {
        this.cars = this.cars.filter(item => item.id !== id);
      },
      (res: HttpErrorResponse) => this.notificationService.error(res.message)
    );
  }

  public handleAction($event) {
    switch ($event.type) {
      case 'add':
        this.router.navigate(['cars', 'create']);
    }
  }

}
