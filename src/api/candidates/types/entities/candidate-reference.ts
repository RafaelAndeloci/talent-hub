import { Entity } from "../../../../shared/types/base-types/entity"

export interface CandidateReference extends Entity {
  name: string
  position: string
  phone: string
  email: string
  relationship: string
  company: string | null
}
