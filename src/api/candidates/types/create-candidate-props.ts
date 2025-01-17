import { Candidate } from "@prisma/client";

type CreateCandidateProps = Omit<Candidate, 'id'>;

export default CreateCandidateProps;