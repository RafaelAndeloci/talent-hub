import { Period } from '../../../../shared/types/period'
import { EmploymentType } from '../enums/employment-type'
import { PositionLevel } from '../enums/position-level'
import { WorkplaceType } from '../enums/workplace-type'

export interface CandidateProfessionalExperience {
  title: string
  description: string | null
  company: string
  employmentType: EmploymentType
  workplaceType: WorkplaceType
  positionLevel: PositionLevel
  isCurrent: boolean
  period: Period
  // TODO: Define Location type
  location: object | null
  relatedSkills: string[]
}
