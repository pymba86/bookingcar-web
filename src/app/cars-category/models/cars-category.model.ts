import { BaseEntity } from '@tabler/angular-core/src/models/base-entity';

export class CarCategory implements BaseEntity {
  constructor(
    public id?: number,
    public name?: string,
    public driverAgeMin?: number,
    public driverExperienceMin?: number,
    public cars?: BaseEntity[],
  ) {
  }
}
