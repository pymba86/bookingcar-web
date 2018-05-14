import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import 'rxjs/add/observable/throw';
import {Car} from '../models/car.model';
import {HttpClient} from '@angular/common/http';

@Injectable()
export class CarsService {

  url = '/api/cars';

  constructor(private http: HttpClient) {
  }

  list(): Observable<Car[]> {
    return this.http.get<Car[]>(this.url);
  }

  read(id: number): Observable<Car> {
    return this.http
      .get<Car>(this.url + `/${id}`);
  }

  update(item: Car): Observable<Car> {
    return this.http.patch<Car>(this.url + `/${item.id}`, item);;
  }

  create(item: Car): Observable<Car> {
    return this.http.post<Car>(this.url, item);
  }

  delete(id: number): Observable<Car> {
    return this.http.delete<Car>(this.url + `/${id}`);
  }

}
