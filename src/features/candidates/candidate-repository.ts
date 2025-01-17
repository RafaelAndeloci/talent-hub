import makeRepository from "../../shared/services/repository-factory";
import CandidateProps from "./types/candidate-props";

const candidateRepository = makeRepository<CandidateProps>("candidate");
export default candidateRepository;