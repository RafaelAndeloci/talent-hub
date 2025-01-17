import CandidateDtoProps from './candidate-dto-props';

type UpdateCandidateProps = {
  id: string;
  payload: Partial<Omit<CandidateDtoProps, 'id'>>;
};

export default UpdateCandidateProps;