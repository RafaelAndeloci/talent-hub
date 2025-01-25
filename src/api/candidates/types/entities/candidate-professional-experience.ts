import { Period } from '../../../../shared/types/period'

export interface CandidateProfessionalExperience {
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
