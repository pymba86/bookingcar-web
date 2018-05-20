import { BaseEntity } from '@tabler/angular-core/src/models/base-entity';

export class CarFuel implements BaseEntity {
  constructor(
    public id?: number,
    public name?: string,
    public cars?: BaseEntity[],
  ) {
  }
}
