import {Component, OnInit, OnDestroy} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {HttpResponse} from '@angular/common/http';
import {Subscription} from 'rxjs/Subscription';
import {CarGearbox} from '../models/car-gearbox.model';
import {CarsGearboxService} from '../services/cars-gearbox.service';

@Component({
  selector: 'app-cars-gearbox-detail',
  template: `
    <ui-page>
      <div class="card" *ngIf="carGearbox">
        <div class="card-header">
          <h3 class="card-title">Коробка передач: {{ carGearbox.name }}</h3>
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
              <span>{{carGearbox.name}}</span>
            </dd>
          </dl>
        </div>
        <div class="card-footer text-muted">
      <span class="float-md-right ">
        <a [routerLink]="['cars-gearbox', carGearbox.id + '/edit' ]" class="btn btn-sm btn-outline-warning"> Изменить</a>
      </span>
        </div>
      </div>
    </ui-page>`
})
export class CarsGearboxDetailComponent implements OnInit, OnDestroy {

  carGearbox: CarGearbox;
  private subscription: Subscription;

  constructor(private carGearboxService: CarsGearboxService,
              private route: ActivatedRoute) {
  }

  ngOnInit() {
    this.subscription = this.route.params.subscribe((params) => {
      this.load(params['id']);
    });
  }

  load(id) {
    this.carGearboxService.find(id)
      .subscribe((carResponse: HttpResponse<CarGearbox>) => {
        this.carGearbox = carResponse.body;
      });
  }

  previousState() {
    window.history.back();
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
