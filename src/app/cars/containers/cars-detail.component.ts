import {Component, OnInit, OnDestroy} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {HttpResponse} from '@angular/common/http';
import {Subscription} from 'rxjs/Subscription';
import {Car} from '../models/car.model';
import {CarsService} from '../services/cars.service';

@Component({
  selector: 'app-cars-detail',
  template: `
    <ui-page>
      <div class="card" *ngIf="car">
        <div class="card-header">
          <h3 class="card-title">Автомобиль: {{ car.name }}</h3>
          <div class="card-options">
            <button type="submit"
                    (click)="previousState()"
                    class="btn btn-sm btn-info">
              <span class="fa fa-arrow-left"></span>&nbsp;<span> Назад</span>
            </button>
          </div>
        </div>
        <div class="card-body">
          <dl>
            <dt><span>Название</span></dt>
            <dd>
              <span>{{car.name}}</span>
            </dd>
            <dt><span>Год</span></dt>
            <dd>
              <span>{{car.productionYear}}</span>
            </dd>
            <dt><span>Дверей</span></dt>
            <dd>
              <span>{{car.doors}}</span>
            </dd>
            <dt><span>Мест</span></dt>
            <dd>
              <span>{{car.places}}</span>
            </dd>
            <dt><span>Мощность</span></dt>
            <dd>
              <span>{{car.motorPower}}</span>
            </dd>
            <dt><span>Цена</span></dt>
            <dd>
              <span>{{car.price}}</span>
            </dd>
            <dt><span>Дверей</span></dt>
            <dd>
              <div *ngIf="car.gearbox">
                {{car.gearbox?.name}}
              </div>
            </dd>
            <dt><span>Топливо</span></dt>
            <dd>
              <div *ngIf="car.fuel">
                {{car.fuel?.name}}
              </div>
            </dd>
            <dt><span>Локация</span></dt>
            <dd>
              <div *ngIf="car.location">
                {{car.location?.name}}
              </div>
            </dd>
            <dt><span>Привод</span></dt>
            <dd>
              <div *ngIf="car.actuator">
                {{car.actuator?.name}}
              </div>
            </dd>
            <dt><span>Категория</span></dt>
            <dd>
              <div *ngIf="car.category">
                {{car.category?.name}}
              </div>
            </dd>
          </dl>
        </div>
      </div>
    </ui-page>`
})
export class CarsDetailComponent implements OnInit, OnDestroy {

  car: Car;
  private subscription: Subscription;

  constructor(private carsService: CarsService,
              private route: ActivatedRoute) {
  }

  ngOnInit() {
    this.subscription = this.route.params.subscribe((params) => {
      this.load(params['id']);
    });
  }

  load(id) {
    this.carsService.find(id)
      .subscribe((carResponse: HttpResponse<Car>) => {
        this.car = carResponse.body;
      });
  }

  previousState() {
    window.history.back();
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
