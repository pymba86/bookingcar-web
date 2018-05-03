import {Action} from '@ngrx/store';
import {Car} from '../models/car.model';
import {Update} from '@ngrx/entity';


export const LOAD_ALL = '[Cars] LOAD ALL';
export const LOAD_ALL_SUCCESS = '[Cars] LOAD ALL SUCCESS';

export const FAILURE = '[Contacts] FAILURE';

export const LOAD = '[Cars] LOAD';
export const LOAD_SUCCESS = '[Cars] LOAD SUCCESS';

export const SET_CURRENT_CAR_ID = '[Cars] SET CURRENT CAR ID';

export const PATCH = '[Cars] PATCH';
export const PATCH_SUCCESS = '[Cars] PATCH SUCCESS';

export class LoadAll implements Action {
  readonly type = LOAD_ALL;

  constructor(public payload = null) {
  }
}

export class Load implements Action {
  readonly type = LOAD;

  constructor(public payload: number) {
  }
}

export class SetCurrentCarId implements Action {
  readonly type = SET_CURRENT_CAR_ID;

  constructor(public payload: number) {
  }
}

export class LoadSuccess implements Action {
  readonly type = LOAD_SUCCESS;

  constructor(public payload: Car) {
  }
}

export class LoadAllSuccess implements Action {
  readonly type = LOAD_ALL_SUCCESS;

  constructor(public payload: Car[]) {
  }
}

export class Patch implements Action {
  readonly type = PATCH;

  constructor(public payload: Car) {
  }
}

export class PatchSuccess implements Action {
  readonly type = PATCH_SUCCESS;

  constructor(public payload: Update<Car>) {
  }
}

export class Failure implements Action {
  readonly type = FAILURE;
  constructor (public payload: {concern: 'CREATE' | 'PATCH', error: any}) {}
}

export type All =
  | LoadAll
  | LoadAllSuccess
  | Load
  | LoadSuccess
  | Patch
  | Failure
  | PatchSuccess
  | SetCurrentCarId

