import { UserEntity } from '../../../../shared/types/base-types/user-entity'
import { Contact } from '../../../../shared/types/contact'
import { Address } from '../../../../shared/types/address'
import { RelatedWebsites } from '../../../../shared/types/related-websites'
import { CandidatePreferences } from './candidate-preferences'
import { CandidateExperiences } from './candidate-experiences'
import { CandidateLanguage } from './candidate-language'
import { CandidateReference } from './candidate-reference'
import { CandidateAchievement } from './candidate-achievement'

export interface Candidate extends UserEntity {
  fullName: string
  birthDate: Date
  contact: Contact
  address: Address
  cvUrl: string | null
  about: string | null
  professionalHeadline: string | null
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
