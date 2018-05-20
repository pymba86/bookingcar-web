import {Component, OnDestroy, OnInit} from '@angular/core';
import {HttpErrorResponse, HttpResponse} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import {ActivatedRoute, Router} from '@angular/router';
import {CarGearbox} from '../models/car-gearbox.model';
import {CarsGearboxService} from '../services/cars-gearbox.service';

@Component({
  selector: 'app-cars-gearbox-dialog',
  template: `
    <ui-page>
      <div class="card">
        <div class="card-header">
          <h3 class="card-title">Коробка передач</h3>
        </div>
        <div class="card-body">
          <form (submit)="save()" name="editForm" role="form" class="form" novalidate #editForm="ngForm">

            <div class="form-group" [hidden]="!carGearbox.id">
              <label for="id">№</label>
              <input type="text" class="form-control" id="id" name="id"
                     [(ngModel)]="carGearbox.id" readonly/>
            </div>

            <div class="form-group">
              <label class="form-control-label" for="field_name">Название</label>
              <input type="text" class="form-control" name="name" id="field_name"
                     [(ngModel)]="carGearbox.name" required/>
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
export class CarsGearboxDialogComponent implements OnInit, OnDestroy {
  carGearbox: CarGearbox;

  isSaving: boolean;
  routeSub: any;

  constructor( private carsGearboxService: CarsGearboxService,
               private router: Router,
               private route: ActivatedRoute) {
  }

  ngOnInit() {
    this.isSaving = false;
    this.routeSub = this.route.params.subscribe((params) => {
      const id = params['id'];
      if (id) {
        this.carsGearboxService.find(id)
          .subscribe((carResponse: HttpResponse<CarGearbox>) => {
            this.carGearbox = carResponse.body;
          });
      } else {
        this.carGearbox = new CarGearbox();
      }
    });
  }

  save() {
    this.isSaving = true;
    if (this.carGearbox.id !== undefined) {
      this.subscribeToSaveResponse(
        this.carsGearboxService.update(this.carGearbox));
    } else {
      this.subscribeToSaveResponse(
        this.carsGearboxService.create(this.carGearbox));
    }
  }

  private subscribeToSaveResponse(result: Observable<HttpResponse<CarGearbox>>) {
    result.subscribe((res: HttpResponse<CarGearbox>) =>
        this.router.navigate(['/cars-gearbox']),
      (res: HttpErrorResponse) => alert('Не получилось сохранить!'));
  }

  ngOnDestroy() {
    this.routeSub.unsubscribe();
  }

}
