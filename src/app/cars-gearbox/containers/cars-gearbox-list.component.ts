import {Component, OnInit, OnDestroy} from '@angular/core';
import {HttpResponse, HttpErrorResponse} from '@angular/common/http';
import {CarGearbox} from '../models/car-gearbox.model';
import {CarsGearboxService} from '../services/cars-gearbox.service';
import {Subscription} from 'rxjs/Subscription';
import {Notification} from '../../notification/notification.model';
import {NotificationService} from '../../notification/notification.service';
import {CarsFuelService} from '../../cars-fuel/services/cars-fuel.service';
import {Router} from '@angular/router';
import {CarFuel} from '../../cars-fuel/models/car-fuel.model';

@Component({
  selector: 'app-cars-gearbox-list',
  template: `
    <ui-page>
      <ui-card
        (action)="handleAction($event)"
        [header]="card.header"
        [buttons]="card.buttons"
        [alert]="notification">
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
                <a class="icon" (click)="remove(carGearbox.id)">
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
export class CarsGearboxListComponent implements OnInit {
  notification: Notification;
  subscription: Subscription;

  carGearboxes: CarGearbox[];
  card = {
    header: 'Коробка передач',
    buttons: [
      {
        text: 'Добавить',
        type: 'button',
        action: 'add',
        payload: 'ADD_PAYLOAD'
      }
    ]
  };


  constructor(private carsGearboxService: CarsGearboxService,
              private router: Router,
              private notificationService: NotificationService) {
    this.notification = this.notificationService.get();
    this.subscription = this.notificationService.event
      .subscribe((notification) => {
        this.notification = notification;
      });
  }

  loadAll() {
    this.carsGearboxService.query().subscribe(
      (res: HttpResponse<CarGearbox[]>) => {
        this.carGearboxes = res.body;
      },
      (res: HttpErrorResponse) => this.notificationService.error(res.message)
    );
  }

  ngOnInit() {
    this.loadAll();
  }

  remove(id: number) {
    this.carsGearboxService.delete(id).subscribe(
      (res: HttpResponse<CarFuel[]>) => {
        this.carGearboxes = this.carGearboxes.filter(item => item.id !== id);
      },
      (res: HttpErrorResponse) => this.notificationService.error(res.message)
    );
  }

  handleAction($event) {
    switch ($event.type) {
      case 'add':
        this.router.navigate(['cars-gearbox', 'create']);
    }
  }

}
