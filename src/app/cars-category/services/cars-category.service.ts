import {Injectable} from '@angular/core';
import {HttpClient, HttpResponse} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import {CarCategory} from '../models/cars-category.model';

export type EntityResponseType = HttpResponse<CarCategory>;

@Injectable()
export class CarsCategoryService {

  private resourceUrl = 'http://localhost:8080/' + 'api/car-categories';

  constructor(private http: HttpClient) {
  }

  create(carCategory: CarCategory): Observable<EntityResponseType> {
    const copy = this.convert(carCategory);
    return this.http.post<CarCategory>(this.resourceUrl, copy, {observe: 'response'})
      .map((res: EntityResponseType) => this.convertResponse(res));
  }

  update(carCategory: CarCategory): Observable<EntityResponseType> {
    const copy = this.convert(carCategory);
    return this.http.put<CarCategory>(this.resourceUrl, copy, {observe: 'response'})
      .map((res: EntityResponseType) => this.convertResponse(res));
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<CarCategory>(`${this.resourceUrl}/${id}`, {observe: 'response'})
      .map((res: EntityResponseType) => this.convertResponse(res));
  }

  query(req?: any): Observable<HttpResponse<CarCategory[]>> {
    return this.http.get<CarCategory[]>(this.resourceUrl, {observe: 'response'})
      .map((res: HttpResponse<CarCategory[]>) => this.convertArrayResponse(res));
  }

  delete(id: number): Observable<HttpResponse<any>> {
    return this.http.delete<any>(`${this.resourceUrl}/${id}`, {observe: 'response'});
  }

  private convertResponse(res: EntityResponseType): EntityResponseType {
    const body: CarCategory = this.convertItemFromServer(res.body);
    return res.clone({body});
  }

  private convertArrayResponse(res: HttpResponse<CarCategory[]>): HttpResponse<CarCategory[]> {
    const jsonResponse: CarCategory[] = res.body;
    const body: CarCategory[] = [];
    for (let i = 0; i < jsonResponse.length; i++) {
      body.push(this.convertItemFromServer(jsonResponse[i]));
    }
    return res.clone({body});
  }

  private convertItemFromServer(carCategory: CarCategory): CarCategory {
    const copy: CarCategory = Object.assign({}, carCategory);
    return copy;
  }

  private convert(carCategory: CarCategory): CarCategory {
    const copy: CarCategory = Object.assign({}, carCategory);
    return copy;
  }


}
