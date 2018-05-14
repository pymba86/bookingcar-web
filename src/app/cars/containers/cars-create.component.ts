import {ChangeDetectionStrategy, Component, OnDestroy, OnInit} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {ActionsSubject, Store} from '@ngrx/store';
import {ActivatedRoute, Router} from '@angular/router';
import {Car} from '../models/car.model';
import * as carsActions from '../store/cars.actions';
import * as fromCars from '../store';
import {Subscription} from 'rxjs/Subscription';
import {ofType} from '@ngrx/effects';
import {CreateSuccess} from '../store/cars.actions';

@Component({
  selector: 'app-cars-create',
  template: `
    <ui-page>
      <div class="card">
        <div class="card-header">
        <h3 class="card-title">Создать</h3>
        <div class="card-options">
          <a routerLink="/cars" class="btn btn-primary btn-sm">Вернутся</a>
        </div>
        </div>
        <div class="card-body">
          <app-cars-form  (onSubmit)="submitted($event)"> </app-cars-form>
        </div>
      </div>
    </ui-page>
  `,
})
export class CarsCreateComponent implements OnInit, OnDestroy {

  redirectSub: Subscription;
  constructor(
    public store: Store<fromCars.CarsState>,
    private actionsSubject: ActionsSubject,
    private router: Router
  ) { }

  ngOnInit() {
    this.redirectSub = this.actionsSubject.asObservable().pipe(
      ofType(carsActions.CREATE_SUCCESS)
    ).subscribe(
      (action: CreateSuccess) => this.router.navigate(['/cars'])
    );
  }

  submitted(car: Car) {
    this.store.dispatch(new carsActions.Create(car));
  }

  ngOnDestroy() {
    this.redirectSub.unsubscribe();
  }
}
