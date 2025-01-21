import Entity from './entity';

export default interface AuditableEntity extends Entity {
  createdAt: Date;
  updatedAt: Date;
  createdBy: string;
  updatedBy: string;
}
