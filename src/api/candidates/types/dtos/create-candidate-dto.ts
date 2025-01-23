import { CandidateDto } from './candidate-dto'

export type CreateCandidateDto = Omit<
  CandidateDto,
  'id' | 'cvUrl' | 'bannerUrl'
>
