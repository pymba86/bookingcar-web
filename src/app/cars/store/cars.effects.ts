import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {Action} from '@ngrx/store';
import * as carsActions from './cars.actions';
import {Actions, Effect, ofType} from '@ngrx/effects';
import {catchError, map, mergeMap, startWith, switchMap} from 'rxjs/operators';
import {of} from 'rxjs/observable/of';
import {CarsService} from '../services/cars.service';
import {Car} from '../models/car.model';
import {Create, CreateSuccess, Delete, DeleteSuccess, Failure} from './cars.actions';

@Injectable()
export class CarsEffects {

  @Effect()
  loadAll$: Observable<Action> = this.actions$.pipe(
    ofType(carsActions.LOAD_ALL),
    startWith(new carsActions.LoadAll()),
    switchMap(() => this.carsService.list()),
    map((cars: Car[]) => new carsActions.LoadAllSuccess(cars))
  );

  @Effect()
  load$: Observable<Action> = this.actions$.pipe(
    ofType(carsActions.LOAD),
    map( (action: carsActions.Load ) => action.payload),
    switchMap((id) => this.carsService.read(id)),
    mergeMap(
      (car: Car) =>  [
        new carsActions.LoadSuccess(car),
        new carsActions.SetCurrentCarId(car.id)
      ])
  );

  @Effect()
  update$: Observable<Action> = this.actions$.pipe(
    ofType(carsActions.PATCH),
    map((action: carsActions.Patch) => action.payload),
    switchMap((car: Car) => this.carsService.update(car)),
    map((value: Car) => new carsActions.PatchSuccess({id: value.id, changes: value})),
    catchError(err => {
      console.log(err);
      return of(new carsActions.Failure({concern: 'PATCH', error: err}));
    })
  );

  @Effect()
  create$: Observable<Action> = this.actions$.pipe(
    ofType(carsActions.CREATE),
    map((action: Create) => action.payload),
    switchMap((car) => this.carsService.create(car)),
    map( (value: Car) => new CreateSuccess(value)),
    catchError(err => {
      return of(new Failure({concern: 'CREATE', error: err}));
    })
  );

  @Effect()
  delete$: Observable<Action> = this.actions$.pipe(
    ofType(carsActions.DELETE),
    map((action: Delete) => action.payload),
    switchMap(
      (id: number) => this.carsService.delete(id).pipe(
        map( () => new DeleteSuccess(id))
      )
    )
  );

  constructor(
    private actions$: Actions,
    private carsService: CarsService
  ) {}


}
