import { Entity } from '../../../../shared/types/base-types/entity'
import { YearMonth } from '../../../../shared/types/year-month'

export interface CandidateAchievement extends Entity {
  name: string
  type: string
  issuer: string
  issueDate: YearMonth
  expirationDate: YearMonth | null
  credentialId: string | null
  credentialUrl: string | null
  relatedSkills: string[]
}
