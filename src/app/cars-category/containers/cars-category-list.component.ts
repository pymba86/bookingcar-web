import {Component, OnInit, OnDestroy} from '@angular/core';
import {HttpResponse, HttpErrorResponse} from '@angular/common/http';
import {CarCategory} from '../models/cars-category.model';
import {CarsCategoryService} from '../services/cars-category.service';
import {Subscription} from 'rxjs/Subscription';
import {Notification} from '../../notification/notification.model';
import {CarsActuatorService} from '../../cars-actuator/services/cars-actuator.service';
import {NotificationService} from '../../notification/notification.service';
import {Router} from '@angular/router';
import {CarFuel} from '../../cars-fuel/models/car-fuel.model';

@Component({
  selector: 'app-cars-category-list',
  template: `
    <ui-page>
      <ui-card
        (action)="handleAction($event)"
        [header]="card.header"
        [buttons]="card.buttons"
        [alert]="notification">
        <div class="table-responsive" *ngIf="carCategories">
          <table class="table card-table table-vcenter text-nowrap">
            <thead>
            <tr>
              <th class="w-1">№</th>
              <th>Название</th>
              <th>Минимальный возвраст водителя</th>
              <th>Минимальный опыт вождения</th>
              <th class="w-1"></th>
              <th class="w-1"></th>
              <th class="w-1"></th>
            </tr>
            </thead>
            <tbody>
            <tr *ngFor="let carCategory of carCategories">
              <td><span class="text-muted">{{ carCategory.id }}</span></td>
              <td>{{ carCategory.name }}</td>
              <td>{{ carCategory.driverAgeMin }}</td>
              <td>{{ carCategory.driverExperienceMin }}</td>
              <td>
                <a class="icon" [routerLink]="[carCategory.id ]">
                  <i class="fe fe-eye"></i>
                </a>
              </td>
              <td>
                <a class="icon" [routerLink]="[carCategory.id + '/edit' ]">
                  <i class="fe fe-edit"></i>
                </a>
              </td>
              <td>
                <a class="icon" (click)="remove(carCategory.id)">
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
export class CarsCategoryListComponent implements OnInit {
  notification: Notification;
  subscription: Subscription;

  carCategories: CarCategory[];
  card = {
    header: 'Категория',
    buttons: [
      {
        text: 'Добавить',
        type: 'button',
        action: 'add',
        payload: 'ADD_PAYLOAD'
      }
    ]
  };

  constructor(private carsCategoryService: CarsCategoryService,
              private router: Router,
              private notificationService: NotificationService) {
    this.notification = this.notificationService.get();
    this.subscription = this.notificationService.event
      .subscribe((notification) => {
        this.notification = notification;
      });
  }

  loadAll() {
    this.carsCategoryService.query().subscribe(
      (res: HttpResponse<CarCategory[]>) => {
        this.carCategories = res.body;
      },
      (res: HttpErrorResponse) => this.notificationService.error(res.message)
    );
  }

  ngOnInit() {
    this.loadAll();
  }

  remove(id: number) {
    this.carsCategoryService.delete(id).subscribe(
      (res: HttpResponse<CarFuel[]>) => {
        this.carCategories = this.carCategories.filter(item => item.id !== id);
      },
      (res: HttpErrorResponse) => this.notificationService.error(res.message)
    );
  }

  handleAction($event) {
    switch ($event.type) {
      case 'add':
        this.router.navigate(['cars-category', 'create']);
    }
  }

}
