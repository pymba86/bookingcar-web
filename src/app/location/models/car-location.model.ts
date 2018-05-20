import { BaseEntity } from '@tabler/angular-core/src/models/base-entity';

export class CarLocation implements BaseEntity {
  constructor(
    public id?: number,
    public name?: string,
    public address?: string,
    public phone?: string,
    public cars?: BaseEntity[],
  ) {
  }
}
