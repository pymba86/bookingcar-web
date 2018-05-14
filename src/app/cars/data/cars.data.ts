import {InMemoryDbService} from 'angular-in-memory-web-api';

export class CarsData implements InMemoryDbService {
  createDb() {
    const carsDetails = [
      {id: 1, name: 'Ford'},
      {id: 2, name: 'Volvo'},
      {id: 3, name: 'Toyota'}
      ];
    return {cars: carsDetails};
  }
}
