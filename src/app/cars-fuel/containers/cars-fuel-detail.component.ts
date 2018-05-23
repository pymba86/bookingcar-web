import {Component, OnInit, OnDestroy} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {HttpErrorResponse, HttpResponse} from '@angular/common/http';
import {Subscription} from 'rxjs/Subscription';
import {CarFuel} from '../models/car-fuel.model';
import {CarsFuelService} from '../services/cars-fuel.service';

@Component({
  selector: 'app-cars-fuel-detail',
  template: `
    <ui-page>
      <div class="card" *ngIf="carFuel">
        <div class="card-header">
          <h3 class="card-title">Топливо: {{ carFuel.name }}</h3>
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
              <span>{{carFuel.name}}</span>
            </dd>
          </dl>
        </div>
      </div>
    </ui-page>`
})
export class CarsFuelDetailComponent implements OnInit, OnDestroy {

  carFuel: CarFuel;
  private subscription: Subscription;

  constructor(private carFuelService: CarsFuelService,
              private route: ActivatedRoute,
              private router: Router) {
  }

  ngOnInit() {
    this.subscription = this.route.params.subscribe((params) => {
      this.load(params['id']);
    });
  }

  load(id) {
    this.carFuelService.find(id)
      .subscribe((carResponse: HttpResponse<CarFuel>) => {
        this.carFuel = carResponse.body;
      });
  }

  previousState() {
    window.history.back();
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
