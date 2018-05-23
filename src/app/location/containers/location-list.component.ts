import {Component, OnInit, OnDestroy} from '@angular/core';
import {HttpResponse, HttpErrorResponse} from '@angular/common/http';

import {CarLocation} from '../models/car-location.model';
import {CarLocationService} from '../services/location';
import {Subscription} from 'rxjs/Subscription';
import {Notification} from '../../notification/notification.model';
import {CarsGearboxService} from '../../cars-gearbox/services/cars-gearbox.service';
import {NotificationService} from '../../notification/notification.service';
import {Router} from '@angular/router';
import {CarFuel} from '../../cars-fuel/models/car-fuel.model';

@Component({
  selector: 'app-location-list',
  template: `
    <ui-page>
      <ui-card
        (action)="handleAction($event)"
        [header]="card.header"
        [buttons]="card.buttons"
        [alert]="notification">
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
                <a class="icon" (click)="remove(location.id)">
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
export class LocationListComponent implements OnInit {
  notification: Notification;
  subscription: Subscription;

  locations: CarLocation[];
  card = {
    header: 'Станция',
    buttons: [
      {
        text: 'Добавить',
        type: 'button',
        action: 'add',
        payload: 'ADD_PAYLOAD'
      }
    ]
  };


  constructor(private carsLocationService: CarLocationService,
              private router: Router,
              private notificationService: NotificationService) {
    this.notification = this.notificationService.get();
    this.subscription = this.notificationService.event
      .subscribe((notification) => {
        this.notification = notification;
      });
  }

  loadAll() {
    this.carsLocationService.query().subscribe(
      (res: HttpResponse<CarLocation[]>) => {
        this.locations = res.body;
      },
      (res: HttpErrorResponse) => this.notificationService.error(res.message)
    );
  }

  ngOnInit() {
    this.loadAll();
  }

  remove(id: number) {
    this.carsLocationService.delete(id).subscribe(
      (res: HttpResponse<CarFuel[]>) => {
        this.locations = this.locations.filter(item => item.id !== id);
      },
      (res: HttpErrorResponse) => this.notificationService.error(res.message)
    );
  }

  handleAction($event) {
    switch ($event.type) {
      case 'add':
        this.router.navigate(['location', 'create']);
    }
  }


}
