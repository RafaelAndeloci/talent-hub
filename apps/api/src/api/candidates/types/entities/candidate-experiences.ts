import { CandidateEducationalExperience } from './candidate-educational-experience'
import { CandidateProfessionalExperience } from './candidate-professional-experience'

export interface CandidateExperiences {
  education: CandidateEducationalExperience[]
  professional: CandidateProfessionalExperience[]
}
