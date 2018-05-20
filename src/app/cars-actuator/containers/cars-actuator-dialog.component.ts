import {Component, OnDestroy, OnInit} from '@angular/core';
import {HttpErrorResponse, HttpResponse} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import {ActivatedRoute, Router} from '@angular/router';
import {CarActuator} from '../models/cars-actuator.model';
import {CarsActuatorService} from '../services/cars-actuator.service';

@Component({
  selector: 'app-cars-actuator-dialog',
  template: `
    <ui-page>
      <div class="card">
        <div class="card-header">
          <h3 class="card-title">Привод</h3>
        </div>
        <div class="card-body">
          <form (submit)="save()" name="editForm" role="form" class="form" novalidate #editForm="ngForm">

            <div class="form-group" [hidden]="!carActuator.id">
              <label for="id">№</label>
              <input type="text" class="form-control" id="id" name="id"
                     [(ngModel)]="carActuator.id" readonly/>
            </div>

            <div class="form-group">
              <label class="form-control-label" for="field_name">Название</label>
              <input type="text" class="form-control" name="name" id="field_name"
                     [(ngModel)]="carActuator.name" required/>
              <div [hidden]="!(editForm.controls.name?.dirty && editForm.controls.name?.invalid)">
                <small class="form-text text-danger"
                       [hidden]="!editForm.controls.name?.errors?.required">
                  Поле обязательно для заполнения
                </small>
              </div>
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
export class CarsActuatorDialogComponent implements OnInit,  OnDestroy {

  carActuator: CarActuator;

  isSaving: boolean;



  routeSub: any;

  constructor(private carsActuatorService: CarsActuatorService,
              private router: Router,
              private route: ActivatedRoute) {
  }

  ngOnInit() {
    this.isSaving = false;
    this.routeSub = this.route.params.subscribe((params) => {
      const id = params['id'];
      if (id) {
        this.carsActuatorService.find(id)
          .subscribe((carResponse: HttpResponse<CarActuator>) => {
            this.carActuator = carResponse.body;
          });
      } else {
        this.carActuator = new CarActuator();
      }
    });
  }

  save() {
    this.isSaving = true;
    if (this.carActuator.id !== undefined) {
      this.subscribeToSaveResponse(
        this.carsActuatorService.update(this.carActuator));
    } else {
      this.subscribeToSaveResponse(
        this.carsActuatorService.create(this.carActuator));
    }
  }

  private subscribeToSaveResponse(result: Observable<HttpResponse<CarActuator>>) {
    result.subscribe((res: HttpResponse<CarActuator>) =>
        this.router.navigate(['/cars-actuator']),
      (res: HttpErrorResponse) => alert('Не получилось сохранить!'));
  }

  ngOnDestroy() {
    this.routeSub.unsubscribe();
  }

}
