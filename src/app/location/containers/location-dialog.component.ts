import {Component, OnDestroy, OnInit} from '@angular/core';
import {HttpErrorResponse, HttpResponse} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import {ActivatedRoute, Router} from '@angular/router';
import {CarLocationService} from '../services/location';
import {CarLocation} from '../models/car-location.model';

@Component({
  selector: 'app-cars-gearbox-dialog',
  template: `
    <ui-page>
      <div class="card">
        <div class="card-header">
          <h3 class="card-title">Станция</h3>
        </div>
        <div class="card-body">
          <form (submit)="save()" name="editForm" role="form" class="form" novalidate #editForm="ngForm">

            <div class="form-group" [hidden]="!location.id">
              <label for="id">№</label>
              <input type="text" class="form-control" id="id" name="id"
                     [(ngModel)]="location.id" readonly/>
            </div>

            <div class="form-group">
              <label class="form-control-label" for="field_name">Название</label>
              <input type="text" class="form-control" name="name" id="field_name"
                     [(ngModel)]="location.name" required/>
              <div [hidden]="!(editForm.controls.name?.dirty && editForm.controls.name?.invalid)">
                <small class="form-text text-danger"
                       [hidden]="!editForm.controls.name?.errors?.required">
                  Поле обязательно для заполнения
                </small>
              </div>
            </div>
            <div class="form-group">
              <label class="form-control-label" for="field_address">Address</label>
              <input type="text" class="form-control" name="address" id="field_address"
                     [(ngModel)]="location.address" required/>
              <div [hidden]="!(editForm.controls.address?.dirty && editForm.controls.address?.invalid)">
                <small class="form-text text-danger"
                       [hidden]="!editForm.controls.address?.errors?.required">
                  Поле обязательно для заполнения
                </small>
              </div>
            </div>
            <div class="form-group">
              <label class="form-control-label" for="field_phone">Phone</label>
              <input type="text" class="form-control" name="phone" id="field_phone"
                     [(ngModel)]="location.phone" />
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
export class LocationDialogComponent implements OnInit, OnDestroy {
  location: CarLocation;

  isSaving: boolean;
  routeSub: any;

  constructor( private carLocationService: CarLocationService,
               private router: Router,
               private route: ActivatedRoute) {
  }

  ngOnInit() {
    this.isSaving = false;
    this.routeSub = this.route.params.subscribe((params) => {
      const id = params['id'];
      if (id) {
        this.carLocationService.find(id)
          .subscribe((carResponse: HttpResponse<CarLocation>) => {
            this.location = carResponse.body;
          });
      } else {
        this.location = new CarLocation();
      }
    });
  }

  save() {
    this.isSaving = true;
    if (this.location.id !== undefined) {
      this.subscribeToSaveResponse(
        this.carLocationService.update(this.location));
    } else {
      this.subscribeToSaveResponse(
        this.carLocationService.create(this.location));
    }
  }

  private subscribeToSaveResponse(result: Observable<HttpResponse<CarLocation>>) {
    result.subscribe((res: HttpResponse<CarLocation>) =>
        this.router.navigate(['/location']),
      (res: HttpErrorResponse) => alert('Не получилось сохранить!'));
  }

  ngOnDestroy() {
    this.routeSub.unsubscribe();
  }

}
