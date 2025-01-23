import { Entity } from '../../../../shared/types/base-types/entity'

export interface CandidateLanguage extends Entity {
  language: string
  writtenLevel: string
  spokenLevel: string
  readingLevel: string
  listeningLevel: string
}
