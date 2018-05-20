import { BaseEntity } from '@tabler/angular-core/src/models/base-entity';

export class Car implements BaseEntity {
  constructor(
    public id?: number,
    public name?: string,
    public productionYear?: number,
    public doors?: number,
    public places?: number,
    public motorPower?: number,
    public price?: number,
    public gearbox?: BaseEntity,
    public fuel?: BaseEntity,
    public location?: BaseEntity,
    public actuator?: BaseEntity,
    public category?: BaseEntity
  ) {
  }
}
