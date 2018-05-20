import {Injectable} from '@angular/core';
import {HttpClient, HttpResponse} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import {CarActuator} from '../models/cars-actuator.model';

export type EntityResponseType = HttpResponse<CarActuator>;

@Injectable()
export class CarsActuatorService {

  private resourceUrl = 'http://localhost:8080/' + 'api/car-actuators';

  constructor(private http: HttpClient) {
  }

  create(carActuator: CarActuator): Observable<EntityResponseType> {
    const copy = this.convert(carActuator);
    return this.http.post<CarActuator>(this.resourceUrl, copy, {observe: 'response'})
      .map((res: EntityResponseType) => this.convertResponse(res));
  }

  update(carActuator: CarActuator): Observable<EntityResponseType> {
    const copy = this.convert(carActuator);
    return this.http.put<CarActuator>(this.resourceUrl, copy, {observe: 'response'})
      .map((res: EntityResponseType) => this.convertResponse(res));
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<CarActuator>(`${this.resourceUrl}/${id}`, {observe: 'response'})
      .map((res: EntityResponseType) => this.convertResponse(res));
  }

  query(req?: any): Observable<HttpResponse<CarActuator[]>> {
    return this.http.get<CarActuator[]>(this.resourceUrl, {observe: 'response'})
      .map((res: HttpResponse<CarActuator[]>) => this.convertArrayResponse(res));
  }

  delete(id: number): Observable<HttpResponse<any>> {
    return this.http.delete<any>(`${this.resourceUrl}/${id}`, {observe: 'response'});
  }

  private convertResponse(res: EntityResponseType): EntityResponseType {
    const body: CarActuator = this.convertItemFromServer(res.body);
    return res.clone({body});
  }

  private convertArrayResponse(res: HttpResponse<CarActuator[]>): HttpResponse<CarActuator[]> {
    const jsonResponse: CarActuator[] = res.body;
    const body: CarActuator[] = [];
    for (let i = 0; i < jsonResponse.length; i++) {
      body.push(this.convertItemFromServer(jsonResponse[i]));
    }
    return res.clone({body});
  }

  private convertItemFromServer(carActuator: CarActuator): CarActuator {
    const copy: CarActuator = Object.assign({}, carActuator);
    return copy;
  }

  private convert(carActuator: CarActuator): CarActuator {
    const copy: CarActuator = Object.assign({}, carActuator);
    return copy;
  }


}
