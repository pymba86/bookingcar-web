import {Component, OnDestroy, OnInit} from '@angular/core';
import {HttpErrorResponse, HttpResponse} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import {ActivatedRoute, Router} from '@angular/router';
import {CarCategory} from '../models/cars-category.model';
import {CarsCategoryService} from '../services/cars-category.service';

@Component({
  selector: 'app-cars-category-dialog',
  template: `
    <ui-page>
      <div class="card">
        <div class="card-header">
          <h3 class="card-title">Категория</h3>
        </div>
        <div class="card-body">
          <form (submit)="save()" name="editForm" role="form" class="form" novalidate #editForm="ngForm">

            <div class="form-group" [hidden]="!carCategory.id">
              <label for="id">№</label>
              <input type="text" class="form-control" id="id" name="id"
                     [(ngModel)]="carCategory.id" readonly/>
            </div>

            <div class="form-group">
              <label class="form-control-label" for="field_name">Название</label>
              <input type="text" class="form-control" name="name" id="field_name"
                     [(ngModel)]="carCategory.name" required/>
              <div [hidden]="!(editForm.controls.name?.dirty && editForm.controls.name?.invalid)">
                <small class="form-text text-danger"
                       [hidden]="!editForm.controls.name?.errors?.required">
                  Поле обязательно для заполнения
                </small>
              </div>
            </div>

            <div class="form-group">
              <label class="form-control-label" for="field_driverAgeMin">Минимальный возвраст</label>
              <input type="number" class="form-control" name="driverAgeMin" id="field_driverAgeMin"
                     [(ngModel)]="carCategory.driverAgeMin" required/>
              <div [hidden]="!(editForm.controls.driverAgeMin?.dirty && editForm.controls.driverAgeMin?.invalid)">
                <small class="form-text text-danger"
                       [hidden]="!editForm.controls.driverAgeMin?.errors?.required">
                  Поле обязательно для заполнения
                </small>
                <small class="form-text text-danger"
                       [hidden]="!editForm.controls.driverAgeMin?.errors?.number">
                  Ожидается число
                </small>
              </div>
            </div>
            <div class="form-group">
              <label class="form-control-label" for="field_driverExperienceMin">Минимальный опыт вождения</label>
              <input type="number" class="form-control" name="driverExperienceMin" id="field_driverExperienceMin"
                     [(ngModel)]="carCategory.driverExperienceMin" required/>
              <div [hidden]="!(editForm.controls.driverExperienceMin?.dirty && editForm.controls.driverExperienceMin?.invalid)">
                <small class="form-text text-danger"
                       [hidden]="!editForm.controls.driverExperienceMin?.errors?.required">
                  Поле обязательно для заполнения
                </small>
                <small class="form-text text-danger"
                       [hidden]="!editForm.controls.driverExperienceMin?.errors?.number">
                  Ожидается число
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
export class CarsCategoryDialogComponent implements OnInit, OnDestroy {

  carCategory: CarCategory;

  isSaving: boolean;
  routeSub: any;

  constructor(private carsCategoryService: CarsCategoryService,
              private router: Router,
              private route: ActivatedRoute) {
  }

  ngOnInit() {
    this.isSaving = false;
    this.routeSub = this.route.params.subscribe((params) => {
      const id = params['id'];
      if (id) {
        this.carsCategoryService.find(id)
          .subscribe((carResponse: HttpResponse<CarCategory>) => {
            this.carCategory = carResponse.body;
          });
      } else {
        this.carCategory = new CarCategory();
      }
    });
  }

  save() {
    this.isSaving = true;
    if (this.carCategory.id !== undefined) {
      this.subscribeToSaveResponse(
        this.carsCategoryService.update(this.carCategory));
    } else {
      this.subscribeToSaveResponse(
        this.carsCategoryService.create(this.carCategory));
    }
  }

  private subscribeToSaveResponse(result: Observable<HttpResponse<CarCategory>>) {
    result.subscribe((res: HttpResponse<CarCategory>) =>
        this.router.navigate(['/cars-category']),
      (res: HttpErrorResponse) => alert('Не получилось сохранить!'));
  }

  ngOnDestroy() {
    this.routeSub.unsubscribe();
  }

}
