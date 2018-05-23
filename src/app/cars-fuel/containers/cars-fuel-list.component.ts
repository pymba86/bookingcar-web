import {Component, OnInit, OnDestroy} from '@angular/core';
import {HttpResponse, HttpErrorResponse} from '@angular/common/http';
import {CarFuel} from '../models/car-fuel.model';
import {CarsFuelService} from '../services/cars-fuel.service';
import {Subscription} from 'rxjs/Subscription';
import {Notification} from '../../notification/notification.model';
import {CarsCategoryService} from '../../cars-category/services/cars-category.service';
import {NotificationService} from '../../notification/notification.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-cars-fuel-list',
  template: `
    <ui-page>
      <ui-card
        (action)="handleAction($event)"
        [header]="card.header"
        [buttons]="card.buttons"
        [alert]="notification">
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
      </ui-card>
    </ui-page>
  `,
})
export class CarsFuelListComponent implements OnInit {
  notification: Notification;
  subscription: Subscription;

  carFuels: CarFuel[];
  card = {
    header: 'Топливо',
    buttons: [
      {
        text: 'Добавить',
        type: 'button',
        action: 'add',
        payload: 'ADD_PAYLOAD'
      }
    ]
  };



  constructor(private carsFuelService: CarsFuelService,
              private router: Router,
              private notificationService: NotificationService) {
    this.notification = this.notificationService.get();
    this.subscription = this.notificationService.event
      .subscribe((notification) => {
        this.notification = notification;
      });
  }

  loadAll() {
    this.carsFuelService.query().subscribe(
      (res: HttpResponse<CarFuel[]>) => {
        this.carFuels = res.body;
      },
      (res: HttpErrorResponse) => this.notificationService.error(res.message)
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
      (res: HttpErrorResponse) => this.notificationService.error(res.message)
    );
  }

  handleAction($event) {
    switch ($event.type) {
      case 'add':
        this.router.navigate(['cars-fuel', 'create']);
    }
  }

}
