import { Candidate } from '@prisma/client';
import repositoryFactory from '../../services/repository-factory';

const candidateRepository = repositoryFactory.buildFor<Candidate>('Candidate', {
  academicExperiences: {
    include: {
      projects: true,
    }
  },
  professionalExperiences: true,
  skills: true,
  languages: true,
  achievements: true,
  references: true,
});

export default candidateRepository;
