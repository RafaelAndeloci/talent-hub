import { YearMonth } from '../../../../shared/types/year-month'

export interface CandidateAchievement {
  name: string
  type: string
  issuer: string
  issueDate: YearMonth
  expirationDate: YearMonth | null
  credentialId: string | null
  credentialUrl: string | null
  relatedSkills: string[]
}
