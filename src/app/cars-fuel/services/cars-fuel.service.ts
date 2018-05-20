import {Injectable} from '@angular/core';
import {HttpClient, HttpResponse} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import {CarFuel} from '../models/car-fuel.model';

export type EntityResponseType = HttpResponse<CarFuel>;

@Injectable()
export class CarsFuelService {

  private resourceUrl = 'http://localhost:8080/' + 'api/car-fuels';

  constructor(private http: HttpClient) {
  }

  create(carFuel: CarFuel): Observable<EntityResponseType> {
    const copy = this.convert(carFuel);
    return this.http.post<CarFuel>(this.resourceUrl, copy, {observe: 'response'})
      .map((res: EntityResponseType) => this.convertResponse(res));
  }

  update(carFuel: CarFuel): Observable<EntityResponseType> {
    const copy = this.convert(carFuel);
    return this.http.put<CarFuel>(this.resourceUrl, copy, {observe: 'response'})
      .map((res: EntityResponseType) => this.convertResponse(res));
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<CarFuel>(`${this.resourceUrl}/${id}`, {observe: 'response'})
      .map((res: EntityResponseType) => this.convertResponse(res));
  }

  query(req?: any): Observable<HttpResponse<CarFuel[]>> {
    return this.http.get<CarFuel[]>(this.resourceUrl, {observe: 'response'})
      .map((res: HttpResponse<CarFuel[]>) => this.convertArrayResponse(res));
  }

  delete(id: number): Observable<HttpResponse<any>> {
    return this.http.delete<any>(`${this.resourceUrl}/${id}`, {observe: 'response'});
  }

  private convertResponse(res: EntityResponseType): EntityResponseType {
    const body: CarFuel = this.convertItemFromServer(res.body);
    return res.clone({body});
  }

  private convertArrayResponse(res: HttpResponse<CarFuel[]>): HttpResponse<CarFuel[]> {
    const jsonResponse: CarFuel[] = res.body;
    const body: CarFuel[] = [];
    for (let i = 0; i < jsonResponse.length; i++) {
      body.push(this.convertItemFromServer(jsonResponse[i]));
    }
    return res.clone({body});
  }

  private convertItemFromServer(carFuel: CarFuel): CarFuel {
    const copy: CarFuel = Object.assign({}, carFuel);
    return copy;
  }

  private convert(carFuel: CarFuel): CarFuel {
    const copy: CarFuel = Object.assign({}, carFuel);
    return copy;
  }


}
