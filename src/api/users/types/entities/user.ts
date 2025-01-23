import { AuditableEntity } from '../../../../shared/types/base-types/auditable-entity'

export type PasswordReset = {
  token: string
  expiration: number
}

export interface User extends AuditableEntity {
  username: string
  email: string
  hashedPassword: string
  passwordReset: PasswordReset | null
  profilePictureUrl: string | null
  role: string
}
