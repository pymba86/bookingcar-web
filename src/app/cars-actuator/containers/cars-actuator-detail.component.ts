import {Component, OnInit, OnDestroy} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {HttpResponse} from '@angular/common/http';
import {Subscription} from 'rxjs/Subscription';
import {CarActuator} from '../models/cars-actuator.model';
import {CarsActuatorService} from '../services/cars-actuator.service';

@Component({
  selector: 'app-cars-actuator-detail',
  template: `
    <ui-page>
      <div class="card" *ngIf="carActuator">
        <div class="card-header">
          <h3 class="card-title">Категория автомобиля: {{ carActuator.name }}</h3>
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
              <span>{{carActuator.name}}</span>
            </dd>
          </dl>
        </div>
        <div class="card-footer text-muted">
      <span class="float-md-right ">
        <a [routerLink]="['cars-actuator', carActuator.id + '/edit' ]" class="btn btn-sm btn-outline-warning"> Изменить</a>
      </span>
        </div>
      </div>
    </ui-page>`
})
export class CarsActuatorDetailComponent implements OnInit, OnDestroy {

  carActuator: CarActuator;
  private subscription: Subscription;

  constructor(private carActuatorService: CarsActuatorService,
              private route: ActivatedRoute) {
  }

  ngOnInit() {
    this.subscription = this.route.params.subscribe((params) => {
      this.load(params['id']);
    });
  }

  load(id) {
    this.carActuatorService.find(id)
      .subscribe((carResponse: HttpResponse<CarActuator>) => {
        this.carActuator = carResponse.body;
      });
  }

  previousState() {
    window.history.back();
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
