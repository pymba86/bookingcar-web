import {Component, OnInit, OnDestroy} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {HttpResponse} from '@angular/common/http';
import {Subscription} from 'rxjs/Subscription';
import {CarLocation} from '../models/car-location.model';
import {CarLocationService} from '../services/location';

@Component({
  selector: 'app-location-detail',
  template: `
    <ui-page>
      <div class="card" *ngIf="location">
        <div class="card-header">
          <h3 class="card-title">Станция: {{ location.name }}</h3>
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
              <span>{{location.name}}</span>
            </dd>
            <dt><span>Адресс</span></dt>
            <dd>
              <span>{{location.address}}</span>
            </dd>
            <dt><span>Телефон</span></dt>
            <dd>
              <span>{{location.phone}}</span>
            </dd>
          </dl>
        </div>
      </div>
    </ui-page>`
})
export class LocationDetailComponent implements OnInit, OnDestroy {

  location: CarLocation;
  private subscription: Subscription;

  constructor(private locationService: CarLocationService,
              private route: ActivatedRoute) {
  }

  ngOnInit() {
    this.subscription = this.route.params.subscribe((params) => {
      this.load(params['id']);
    });
  }

  load(id) {
    this.locationService.find(id)
      .subscribe((carResponse: HttpResponse<CarLocation>) => {
        this.location = carResponse.body;
      });
  }

  previousState() {
    window.history.back();
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
