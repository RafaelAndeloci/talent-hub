import CandidateModel from './candidate-model';

export type CandidateSkill = Omit<
  CandidateModel['skills'][0],
  'id' | 'candidateId'
>;

export type CandidateRefence = Omit<
  CandidateModel['references'][0],
  'id' | 'candidateId'
>;

export type CandidateAcademicExperienceProject = Omit<
  CandidateModel['academicExperiences'][0]['projects'],
  'id' | 'academicExperienceId'
>;

export type CandidateAcademicExperience = Omit<
  CandidateModel['academicExperiences'][0],
  'id' | 'candidateId' | 'projects'
> & {
  projects: CandidateAcademicExperienceProject[];
};

export type CandidateProfessionalExperience = Omit<
  CandidateModel['professionalExperiences'][0],
  'id' | 'candidateId'
>;

export type CandidateAchievement = Omit<
  CandidateModel['achievements'][0],
  'id' | 'candidateId'
>;

export type Candidate = Omit<
  CandidateModel,
  | 'userId'
  | 'skills'
  | 'references'
  | 'academicExperiences'
  | 'professionalExperiences'
  | 'achievements'
> & {
  skills: CandidateSkill[];
  references: CandidateRefence[];
  academicExperiences: CandidateAcademicExperience[];
  professionalExperiences: CandidateProfessionalExperience[];
  achievements: CandidateAchievement[];
};
