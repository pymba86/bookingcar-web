import {Injectable} from '@angular/core';
import {HttpClient, HttpResponse} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import {CarGearbox} from '../models/car-gearbox.model';

export type EntityResponseType = HttpResponse<CarGearbox>;

@Injectable()
export class CarsGearboxService {

  private resourceUrl = 'http://localhost:8080/' + 'api/car-gearboxes';

  constructor(private http: HttpClient) {
  }

  create(carGearbox: CarGearbox): Observable<EntityResponseType> {
    const copy = this.convert(carGearbox);
    return this.http.post<CarGearbox>(this.resourceUrl, copy, {observe: 'response'})
      .map((res: EntityResponseType) => this.convertResponse(res));
  }

  update(carGearbox: CarGearbox): Observable<EntityResponseType> {
    const copy = this.convert(carGearbox);
    return this.http.put<CarGearbox>(this.resourceUrl, copy, {observe: 'response'})
      .map((res: EntityResponseType) => this.convertResponse(res));
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<CarGearbox>(`${this.resourceUrl}/${id}`, {observe: 'response'})
      .map((res: EntityResponseType) => this.convertResponse(res));
  }

  query(req?: any): Observable<HttpResponse<CarGearbox[]>> {
    return this.http.get<CarGearbox[]>(this.resourceUrl, {observe: 'response'})
      .map((res: HttpResponse<CarGearbox[]>) => this.convertArrayResponse(res));
  }

  delete(id: number): Observable<HttpResponse<any>> {
    return this.http.delete<any>(`${this.resourceUrl}/${id}`, {observe: 'response'});
  }

  private convertResponse(res: EntityResponseType): EntityResponseType {
    const body: CarGearbox = this.convertItemFromServer(res.body);
    return res.clone({body});
  }

  private convertArrayResponse(res: HttpResponse<CarGearbox[]>): HttpResponse<CarGearbox[]> {
    const jsonResponse: CarGearbox[] = res.body;
    const body: CarGearbox[] = [];
    for (let i = 0; i < jsonResponse.length; i++) {
      body.push(this.convertItemFromServer(jsonResponse[i]));
    }
    return res.clone({body});
  }

  private convertItemFromServer(carGearbox: CarGearbox): CarGearbox {
    const copy: CarGearbox = Object.assign({}, carGearbox);
    return copy;
  }

  private convert(carGearbox: CarGearbox): CarGearbox {
    const copy: CarGearbox = Object.assign({}, carGearbox);
    return copy;
  }


}
