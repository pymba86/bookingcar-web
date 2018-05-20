import {Component, OnDestroy, OnInit} from '@angular/core';
import {Car} from '../models/car.model';
import {HttpErrorResponse, HttpResponse} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import {ActivatedRoute, Router} from '@angular/router';
import {CarGearbox} from '../../cars-gearbox/models/car-gearbox.model';
import {CarFuel} from '../../cars-fuel/models/car-fuel.model';
import {CarLocation} from '../../location/models/car-location.model';
import {CarActuator} from '../../cars-actuator/models/cars-actuator.model';
import {CarCategory} from '../../cars-category/models/cars-category.model';
import {CarsService} from '../services/cars.service';
import {CarsFuelService} from '../../cars-fuel/services/cars-fuel.service';
import {CarsGearboxService} from '../../cars-gearbox/services/cars-gearbox.service';
import {CarLocationService} from '../../location/services/location';
import {CarsActuatorService} from '../../cars-actuator/services/cars-actuator.service';
import {CarsCategoryService} from '../../cars-category/services/cars-category.service';

@Component({
  selector: 'app-cars-dialog',
  template: `
    <ui-page>
      <div class="card">
        <div class="card-header">
          <h3 class="card-title">Автомобиль</h3>
        </div>
        <div class="card-body">
          <form (submit)="save()" name="editForm" role="form" class="form" novalidate #editForm="ngForm">

            <div class="form-group" [hidden]="!car.id">
              <label for="id">№</label>
              <input type="text" class="form-control" id="id" name="id"
                     [(ngModel)]="car.id" readonly/>
            </div>

            <div class="form-group">
              <label class="form-control-label" for="field_name">Название</label>
              <input type="text" class="form-control" name="name" id="field_name"
                     [(ngModel)]="car.name" required/>
              <div [hidden]="!(editForm.controls.name?.dirty && editForm.controls.name?.invalid)">
                <small class="form-text text-danger"
                       [hidden]="!editForm.controls.name?.errors?.required">
                  Поле обязательно для заполнения
                </small>
              </div>
            </div>

            <div class="form-group">
              <label class="form-control-label" for="field_productionYear">Год выпуска</label>
              <input type="number" class="form-control" name="productionYear" id="field_productionYear"
                     [(ngModel)]="car.productionYear"/>
            </div>

            <div class="form-group">
              <label class="form-control-label" for="field_doors">Дверей</label>
              <input type="number" class="form-control" name="doors" id="field_doors"
                     [(ngModel)]="car.doors"/>
            </div>

            <div class="form-group">
              <label class="form-control-label" for="field_places">Мест</label>
              <input type="number" class="form-control" name="places" id="field_places"
                     [(ngModel)]="car.places"/>
            </div>
            <div class="form-group">
              <label class="form-control-label" for="field_motorPower">Мощность</label>
              <input type="number" class="form-control" name="motorPower" id="field_motorPower"
                     [(ngModel)]="car.motorPower"/>
            </div>
            <div class="form-group">
              <label class="form-control-label" for="field_price">Цена</label>
              <input type="number" class="form-control" name="price" id="field_price"
                     [(ngModel)]="car.price" required/>
              <div [hidden]="!(editForm.controls.price?.dirty && editForm.controls.price?.invalid)">
                <small class="form-text text-danger"
                       [hidden]="!editForm.controls.price?.errors?.required">
                  Поле обязательно для заполнения
                </small>
                <small class="form-text text-danger"
                       [hidden]="!editForm.controls.price?.errors?.number">
                  Поле обязательно для заполнения
                </small>
              </div>
            </div>

            <div class="form-group">
              <label class="form-control-label" for="field_gearbox">Коробка передач</label>
              <select class="form-control" id="field_gearbox" name="gearbox" [(ngModel)]="car.gearbox">
                <option [ngValue]="null"></option>
                <option [ngValue]="carGearboxOption.id === car.gearbox?.id ? car.gearbox : carGearboxOption"
                        *ngFor="let carGearboxOption of carGearboxes">{{carGearboxOption.name}}
                </option>
              </select>
            </div>
            <div class="form-group">
              <label class="form-control-label" for="field_fuel">Топливо</label>
              <select class="form-control" id="field_fuel" name="fuel" [(ngModel)]="car.fuel">
                <option [ngValue]="null"></option>
                <option [ngValue]="carFuelOption.id === car.fuel?.id ? car.fuel : carFuelOption"
                        *ngFor="let carFuelOption of carFuels">{{carFuelOption.name}}
                </option>
              </select>
            </div>
            <div class="form-group">
              <label class="form-control-label" for="field_location">Станция</label>
              <select class="form-control" id="field_location" name="location" [(ngModel)]="car.location">
                <option [ngValue]="null"></option>
                <option [ngValue]="locationOption.id === car.location?.id ? car.location : locationOption"
                        *ngFor="let locationOption of carLocations">{{locationOption.name}}
                </option>
              </select>
            </div>
            <div class="form-group">
              <label class="form-control-label" for="field_actuator">Привод</label>
              <select class="form-control" id="field_actuator" name="actuator" [(ngModel)]="car.actuator">
                <option [ngValue]="null"></option>
                <option [ngValue]="carActuatorOption.id === car.actuator?.id ? car.actuator : carActuatorOption"
                        *ngFor="let carActuatorOption of carActuators">{{carActuatorOption.name}}
                </option>
              </select>
            </div>
            <div class="form-group">
              <label class="form-control-label" for="field_category">Категория</label>
              <select class="form-control" id="field_category" name="category" [(ngModel)]="car.category">
                <option [ngValue]="null"></option>
                <option [ngValue]="carCategoryOption.id === car.category?.id ? car.category : carCategoryOption"
                        *ngFor="let carCategoryOption of carCategories">{{carCategoryOption.name}}
                </option>
              </select>
            </div>
            <div class="form-group">
              <button type="submit" [disabled]="editForm.form.invalid || isSaving" class="btn btn-primary">
                <span class="fa fa-save"></span>&nbsp;<span>Сохранить</span>
              </button>
            </div>
          </form>
        </div>
      </div>
    </ui-page>
  `,
})
export class CarsDialogComponent implements OnInit,  OnDestroy {

  car: Car;

  isSaving: boolean;

  carGearboxes: CarGearbox[];

  carFuels: CarFuel[];

  carLocations: CarLocation[];

  carActuators: CarActuator[];

  carCategories: CarCategory[];

  routeSub: any;

  constructor(private carsService: CarsService,
              private carsGearboxService: CarsGearboxService,
              private carsFuelService: CarsFuelService,
              private carLocationService: CarLocationService,
              private carsActuatorService: CarsActuatorService,
              private carsCategoryService: CarsCategoryService,
              private router: Router,
              private route: ActivatedRoute) {
  }

  ngOnInit() {
    this.isSaving = false;
    this.routeSub = this.route.params.subscribe((params) => {
     const id = params['id'];
      if (id) {
        this.carsService.find(id)
          .subscribe((carResponse: HttpResponse<Car>) => {
            this.car = carResponse.body;
          });
      } else {
        this.car = new Car();
      }
    });
    this.carsGearboxService.query()
      .subscribe((res: HttpResponse<CarGearbox[]>) => {
        this.carGearboxes = res.body;
      }, (res: HttpErrorResponse) => alert(res.message));
    this.carsFuelService.query()
      .subscribe((res: HttpResponse<CarFuel[]>) => {
        this.carFuels = res.body;
      }, (res: HttpErrorResponse) => alert(res.message));
    this.carLocationService.query()
      .subscribe((res: HttpResponse<CarLocation[]>) => {
        this.carLocations = res.body;
      }, (res: HttpErrorResponse) => alert(res.message));
    this.carsActuatorService.query()
      .subscribe((res: HttpResponse<CarActuator[]>) => {
        this.carActuators = res.body;
      }, (res: HttpErrorResponse) => alert(res.message));
    this.carsCategoryService.query()
      .subscribe((res: HttpResponse<CarCategory[]>) => {
        this.carCategories = res.body;
      }, (res: HttpErrorResponse) => alert(res.message));
  }

  save() {
    this.isSaving = true;
    if (this.car.id !== undefined) {
      this.subscribeToSaveResponse(
        this.carsService.update(this.car));
    } else {
      this.subscribeToSaveResponse(
        this.carsService.create(this.car));
    }
  }

  private subscribeToSaveResponse(result: Observable<HttpResponse<Car>>) {
    result.subscribe((res: HttpResponse<Car>) =>
        this.router.navigate(['/cars']),
      (res: HttpErrorResponse) => alert('Не получилось сохранить!'));
  }

  ngOnDestroy() {
    this.routeSub.unsubscribe();
  }

}
