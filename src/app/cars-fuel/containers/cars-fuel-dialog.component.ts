import {Component, OnDestroy, OnInit} from '@angular/core';
import {HttpErrorResponse, HttpResponse} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import {ActivatedRoute, Router} from '@angular/router';
import {CarsFuelService} from '../services/cars-fuel.service';
import {CarFuel} from '../models/car-fuel.model';

@Component({
  selector: 'app-cars-fuel-dialog',
  template: `
    <ui-page>
      <div class="card">
        <div class="card-header">
          <h3 class="card-title">Топливо</h3>
        </div>
        <div class="card-body">
          <form (submit)="save()" name="editForm" role="form" class="form" novalidate #editForm="ngForm">

            <div class="form-group" [hidden]="!carFuel.id">
              <label for="id">№</label>
              <input type="text" class="form-control" id="id" name="id"
                     [(ngModel)]="carFuel.id" readonly/>
            </div>

            <div class="form-group">
              <label class="form-control-label" for="field_name">Название</label>
              <input type="text" class="form-control" name="name" id="field_name"
                     [(ngModel)]="carFuel.name" required/>
              <div [hidden]="!(editForm.controls.name?.dirty && editForm.controls.name?.invalid)">
                <small class="form-text text-danger"
                       [hidden]="!editForm.controls.name?.errors?.required">
                  Поле обязательно для заполнения
                </small>
              </div>
            </div>
            <button type="submit" [disabled]="editForm.form.invalid || isSaving" class="btn btn-primary">
                <span class="fa fa-save"></span>&nbsp;<span>Сохранить</span>
              </button>
          </form>
        </div>
      </div>
    </ui-page>
  `,
})
export class CarsFuelDialogComponent implements OnInit, OnDestroy {

  carFuel: CarFuel;

  isSaving: boolean;
  routeSub: any;

  constructor(private carsFuelService: CarsFuelService,
              private router: Router,
              private route: ActivatedRoute) {
  }

  ngOnInit() {
    this.isSaving = false;
    this.routeSub = this.route.params.subscribe((params) => {
      const id = params['id'];
      if (id) {
        this.carsFuelService.find(id)
          .subscribe((carResponse: HttpResponse<CarFuel>) => {
            this.carFuel = carResponse.body;
          });
      } else {
        this.carFuel = new CarFuel();
      }
    });
  }

  previousState() {
    window.history.back();
  }

  save() {
    this.isSaving = true;
    if (this.carFuel.id !== undefined) {
      this.subscribeToSaveResponse(
        this.carsFuelService.update(this.carFuel));
    } else {
      this.subscribeToSaveResponse(
        this.carsFuelService.create(this.carFuel));
    }
  }

  private subscribeToSaveResponse(result: Observable<HttpResponse<CarFuel>>) {
    result.subscribe((res: HttpResponse<CarFuel>) =>
        this.router.navigate(['/cars-fuel']),
      (res: HttpErrorResponse) => alert('Не получилось сохранить!'));
  }

  ngOnDestroy() {
    this.routeSub.unsubscribe();
  }

}
