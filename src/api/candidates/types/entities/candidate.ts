import { Contact } from '../../../../shared/types/contact'
import { Address } from '../../../../shared/types/address'
import { RelatedWebsites } from '../../../../shared/types/related-websites'
import { CandidatePreferences } from './candidate-preferences'
import { CandidateExperiences } from './candidate-experiences'
import { CandidateLanguage } from './candidate-language'
import { CandidateReference } from './candidate-reference'
import { CandidateAchievement } from './candidate-achievement'
import { Entity } from '../../../../shared/types/entity'

export interface Candidate extends Entity {
  fullName: string
  birthDate: string
  professionalHeadline: string | null
  contact: Contact
  address: Address
  cvUrl: string | null
  about: string | null
  bannerUrl: string | null
  hobbies: string[]
  social: RelatedWebsites
  isAvailableForWork: boolean
  allowThirdPartyApplications: boolean
  preferences: CandidatePreferences
  experiences: CandidateExperiences
  languages: CandidateLanguage[]
  references: CandidateReference[]
  achievements: CandidateAchievement[]
}
