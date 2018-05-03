import {EntityState, createEntityAdapter, EntityAdapter, Update} from '@ngrx/entity';
import * as carsActions from './cars.actions';
import {Car} from '../models/car.model';



export const carsAdapter: EntityAdapter<Car> = createEntityAdapter<Car>({
  selectId: (car: Car) => car.id,
  sortComparer: false
});


export interface State extends EntityState<Car> {
  currentCarId: number | null
}

export const initialState: State = carsAdapter.getInitialState({
  currentCarId: null
});



export function reducer(
  state: State = initialState,
  {type, payload}: carsActions.All
) {

  switch (type) {

    case carsActions.LOAD_ALL_SUCCESS : {
      return {...state, ...carsAdapter.addAll(payload as Car[], state)}
    }

    case carsActions.SET_CURRENT_CAR_ID : {
      return {...state, currentCarId: payload}
    }

    case carsActions.LOAD_SUCCESS : {
      return {...state, ...carsAdapter.addOne(payload as Car, state)}
    }

    case carsActions.PATCH_SUCCESS : {
      return {
        ...state,
        ...carsAdapter.updateOne(payload as Update<Car>, state)
      }
    }

    default: {
      return state;
    }

  }
}

export const getCurrentCarId = (state: State) => state.currentCarId;
