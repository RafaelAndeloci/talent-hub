import { Period } from '../../../../shared/types/period'
import { YearMonth } from '../../../../shared/types/year-month'
import { AcademicDegreeType } from '../enums/academic-degree-type'
import { AcademicStatus } from '../enums/academic-status'

export interface CandidateEducationalExperience {
  degree: string
  fieldOfStudy: string
  type: AcademicDegreeType
  institution: string
  institutionWebsite: string | null
  description: string | null
  period: Period
  isCurrent: boolean
  status: AcademicStatus
  semesters: number | null
  currentSemester: number | null
  institutionRegistrationNumber: string | null
  gradePointAverage: number | null
  expectedGraduation: YearMonth | null
}
