import { Entity } from '../../../../shared/types/base-types/entity'
import { Period } from '../../../../shared/types/period'

export interface CandidateProfessionalExperience extends Entity {
  title: string
  description: string | null
  company: string
  employmentType: string
  workplaceType: string
  positionLevel: string
  isCurrent: boolean
  period: Period
  // TODO: Define Location type
  location: object | null
  relatedSkills: string[]
}
