import {Injectable} from '@angular/core';
import {HttpClient, HttpResponse} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import {CarLocation} from '../models/car-location.model';

export type EntityResponseType = HttpResponse<CarLocation>;

@Injectable()
export class CarLocationService {

  private resourceUrl = 'http://localhost:8080/' + 'api/locations';

  constructor(private http: HttpClient) {
  }

  create(location: CarLocation): Observable<EntityResponseType> {
    const copy = this.convert(location);
    return this.http.post<CarLocation>(this.resourceUrl, copy, {observe: 'response'})
      .map((res: EntityResponseType) => this.convertResponse(res));
  }

  update(location: CarLocation): Observable<EntityResponseType> {
    const copy = this.convert(location);
    return this.http.put<CarLocation>(this.resourceUrl, copy, {observe: 'response'})
      .map((res: EntityResponseType) => this.convertResponse(res));
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<CarLocation>(`${this.resourceUrl}/${id}`, {observe: 'response'})
      .map((res: EntityResponseType) => this.convertResponse(res));
  }

  query(req?: any): Observable<HttpResponse<CarLocation[]>> {
    return this.http.get<CarLocation[]>(this.resourceUrl, {observe: 'response'})
      .map((res: HttpResponse<CarLocation[]>) => this.convertArrayResponse(res));
  }

  delete(id: number): Observable<HttpResponse<any>> {
    return this.http.delete<any>(`${this.resourceUrl}/${id}`, {observe: 'response'});
  }

  private convertResponse(res: EntityResponseType): EntityResponseType {
    const body: CarLocation = this.convertItemFromServer(res.body);
    return res.clone({body});
  }

  private convertArrayResponse(res: HttpResponse<CarLocation[]>): HttpResponse<CarLocation[]> {
    const jsonResponse: CarLocation[] = res.body;
    const body: CarLocation[] = [];
    for (let i = 0; i < jsonResponse.length; i++) {
      body.push(this.convertItemFromServer(jsonResponse[i]));
    }
    return res.clone({body});
  }

  private convertItemFromServer(location: CarLocation): CarLocation {
    const copy: CarLocation = Object.assign({}, location);
    return copy;
  }

  private convert(location: CarLocation): CarLocation {
    const copy: CarLocation = Object.assign({}, location);
    return copy;
  }


}
