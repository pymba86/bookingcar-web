import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import {Car} from '../models/car.model';

@Injectable()
export class CarsService {

  cars: Car[] = [{id: 1, name: 'Ford'}, {id: 2, name: 'Volvo'}, {id: 3, name: 'Toyota'}];

  constructor() {
  }

  list(): Observable<Car[]> {
    return Observable.of(this.cars);
  }

  read(id: number): Observable<Car> {
    return Observable.of(this.cars[id-1])
  }

  update(item: Car): Observable<Car> {
    this.cars[item.id-1] = item;
    return Observable.of(item)
  }

}
