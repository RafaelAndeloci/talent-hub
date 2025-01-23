import { Entity } from './entity'

export interface AuditableEntity extends Entity {
  createdAt: Date
  updatedAt: Date
  deletedAt: Date | null
}
