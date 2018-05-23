import {Component, OnInit, OnDestroy} from '@angular/core';
import {HttpResponse, HttpErrorResponse} from '@angular/common/http';
import {CarActuator} from '../models/cars-actuator.model';
import {CarsActuatorService} from '../services/cars-actuator.service';
import {Subscription} from 'rxjs/Subscription';
import {Notification} from '../../notification/notification.model';
import {CarsService} from '../../cars/services/cars.service';
import {NotificationService} from '../../notification/notification.service';
import {Router} from '@angular/router';
import {CarFuel} from '../../cars-fuel/models/car-fuel.model';

@Component({
  selector: 'app-cars-actuator-list',
  template: `
    <ui-page>
      <ui-card
        (action)="handleAction($event)"
        [header]="card.header"
        [buttons]="card.buttons"
        [alert]="notification">
        <div class="table-responsive" *ngIf="carActuators">
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
            <tr *ngFor="let carActuator of carActuators">
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
                <a class="icon" (click)="remove(carActuator.id)">
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
export class CarsActuatorListComponent implements OnInit {
  notification: Notification;
  subscription: Subscription;

  carActuators: CarActuator[];
  card = {
    header: 'Привод',
    buttons: [
      {
        text: 'Добавить',
        type: 'button',
        action: 'add',
        payload: 'ADD_PAYLOAD'
      }
    ]
  };

  constructor(private carsActuatorService: CarsActuatorService,
              private router: Router,
              private notificationService: NotificationService) {
    this.notification = this.notificationService.get();
    this.subscription = this.notificationService.event
      .subscribe((notification) => {
        this.notification = notification;
      });
  }

  loadAll() {
    this.carsActuatorService.query().subscribe(
      (res: HttpResponse<CarActuator[]>) => {
        this.carActuators = res.body;
      },
      (res: HttpErrorResponse) => this.notificationService.error(res.message)
    );
  }

  ngOnInit() {
    this.loadAll();
  }

  remove(id: number) {
    this.carsActuatorService.delete(id).subscribe(
      (res: HttpResponse<CarFuel[]>) => {
        this.carActuators = this.carActuators.filter(item => item.id !== id);
      },
      (res: HttpErrorResponse) => this.notificationService.error(res.message)
    );
  }

  handleAction($event) {
    switch ($event.type) {
      case 'add':
        this.router.navigate(['cars-actuator', 'create']);
    }
  }

}
