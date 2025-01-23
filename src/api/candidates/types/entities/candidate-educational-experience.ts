import { Entity } from '../../../../shared/types/base-types/entity'
import { Period } from '../../../../shared/types/period'
import { YearMonth } from '../../../../shared/types/year-month'

export interface CandidateEducationalExperience extends Entity {
  degree: string
  fieldOfStudy: string
  type: string
  institution: string
  institutionWebsite: string | null
  description: string | null
  period: Period
  isCurrent: boolean
  status: string
  semesters: number | null
  currentSemester: number | null
  institutionRegistrationNumber: string | null
  gradePointAverage: number | null
  expectedGraduation: YearMonth | null
}
