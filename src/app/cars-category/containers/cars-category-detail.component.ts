import {Component, OnInit, OnDestroy} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {HttpResponse} from '@angular/common/http';
import {Subscription} from 'rxjs/Subscription';
import {CarCategory} from '../models/cars-category.model';
import {CarsCategoryService} from '../services/cars-category.service';

@Component({
  selector: 'app-cars-category-detail',
  template: `
    <ui-page>
      <div class="card" *ngIf="carCategory">
        <div class="card-header">
          <h3 class="card-title">Категория автомобиля: {{ carCategory.name }}</h3>
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
              <span>{{carCategory.name}}</span>
            </dd>
          </dl>
          <dl>
            <dt><span>Минимальный возвраст водителя</span></dt>
            <dd>
              <span>{{carCategory.driverAgeMin}}</span>
            </dd>
          </dl>
          <dl>
            <dt><span>Минимальный опыт вождения</span></dt>
            <dd>
              <span>{{carCategory.driverExperienceMin}}</span>
            </dd>
          </dl>
        </div>
        <div class="card-footer text-muted">
      <span class="float-md-right ">
        <a [routerLink]="['cars-category', carCategory.id + '/edit' ]" class="btn btn-sm btn-outline-warning"> Изменить</a>
      </span>
        </div>
      </div>
    </ui-page>`
})
export class CarsCategoryDetailComponent implements OnInit, OnDestroy {

  carCategory: CarCategory;
  private subscription: Subscription;

  constructor(private carCategoryService: CarsCategoryService,
              private route: ActivatedRoute) {
  }

  ngOnInit() {
    this.subscription = this.route.params.subscribe((params) => {
      this.load(params['id']);
    });
  }

  load(id) {
    this.carCategoryService.find(id)
      .subscribe((carResponse: HttpResponse<CarCategory>) => {
        this.carCategory = carResponse.body;
      });
  }

  previousState() {
    window.history.back();
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
