import {Component, OnInit, OnDestroy} from '@angular/core';
import {HttpResponse, HttpErrorResponse} from '@angular/common/http';
import {CarCategory} from '../models/cars-category.model';
import {CarsCategoryService} from '../services/cars-category.service';

@Component({
  selector: 'app-cars-category-list',
  template: `
    <ui-page>
      <div class="card">
        <div class="card-header">
          <h3 class="card-title">Категория</h3>
          <div class="card-options">
            <a routerLink="/cars-category/create" class="btn btn-primary btn-sm">Добавить</a>
          </div>
        </div>
        <div class="table-responsive" *ngIf="carCategories">
          <table class="table card-table table-vcenter text-nowrap">
            <thead>
            <tr>
              <th class="w-1">№</th>
              <th>Название</th>
              <th>Минимальный возвраст водителя</th>
              <th>Минимальный опыт вождения</th>
              <th class="w-1"></th>
              <th class="w-1"></th>
              <th class="w-1"></th>
            </tr>
            </thead>
            <tbody>
            <tr *ngFor="let carCategory of carCategories">
              <td><span class="text-muted">{{ carCategory.id }}</span></td>
              <td>{{ carCategory.name }}</td>
              <td>{{ carCategory.driverAgeMin }}</td>
              <td>{{ carCategory.driverExperienceMin }}</td>
              <td>
                <a class="icon" [routerLink]="[carCategory.id ]">
                  <i class="fe fe-eye"></i>
                </a>
              </td>
              <td>
                <a class="icon" [routerLink]="[carCategory.id + '/edit' ]">
                  <i class="fe fe-edit"></i>
                </a>
              </td>
              <td>
                <a class="icon" (click)="delete(carCategory.id)">
                  <i class="fe fe-trash"></i>
                </a>
              </td>
            </tr>
            </tbody>
          </table>
        </div>
      </div>
    </ui-page>
  `,
})
export class CarsCategoryListComponent implements OnInit {
  carCategories: CarCategory[];

  constructor(private carsCategoryService: CarsCategoryService) {
  }

  loadAll() {
    this.carsCategoryService.query().subscribe(
      (res: HttpResponse<CarCategory[]>) => {
        this.carCategories = res.body;
      },
      (res: HttpErrorResponse) => alert(res.message)
    );
  }

  ngOnInit() {
    this.loadAll();
  }

  delete(id: number) {
    this.carsCategoryService.delete(id);
  }

}
