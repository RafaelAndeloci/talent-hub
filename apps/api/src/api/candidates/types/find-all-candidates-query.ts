import { FindAllArgs } from '../../../types/find-all-args';
import { Candidate } from './candidate';

export type FindAllCandidatesQuery = FindAllArgs<Candidate | 'userId'>;
