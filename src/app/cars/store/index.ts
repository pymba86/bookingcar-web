import * as fromCars from './cars.reducer';
import {ActionReducerMap, createFeatureSelector, createSelector} from '@ngrx/store';

export interface CarsState {
  cars: fromCars.State
}

export const reducers: ActionReducerMap<CarsState> = {
  cars: fromCars.reducer
};

export const getCarsState = createFeatureSelector<fromCars.State>('cars');

export const getSelectedCarId = createSelector(
  getCarsState,
  fromCars.getCurrentCarId
);

export const {
  selectAll: getAllCars,
  selectEntities: getCarEntities
} = fromCars.carsAdapter.getSelectors(getCarsState);


export const getCurrentCar = createSelector(
  getCarEntities,
  getSelectedCarId,
  (entities, id) => id && entities[id]
);
