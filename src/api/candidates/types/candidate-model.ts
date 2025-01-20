import {
  CandidateAcademicExperience,
  CandidateAcademicExperienceProject,
  CandidateAchievement,
  Candidate,
  CandidateProfessionalExperience,
  CandidateReference,
  CandidateSkill,
  CandidateLanguage,
} from '@prisma/client';

export type CandidateSkillModel = CandidateSkill;

export type CandidateReferenceModel = CandidateReference;

export type CandidateAcademicExperienceProjectModel =
  CandidateAcademicExperienceProject;

export type CandidateAcademicExperienceModel = CandidateAcademicExperience & {
  projects: CandidateAcademicExperienceProjectModel[];
};

export type CandidateProfessionalExperienceModel =
  CandidateProfessionalExperience;

export type CandidateAchievementModel = CandidateAchievement;

export type CandidateLanguageModel = CandidateLanguage;

type CandidateModel = Candidate & {
  skills: CandidateSkillModel[];
  references: CandidateReferenceModel[];
  academicExperiences: CandidateAcademicExperienceModel[];
  professionalExperiences: CandidateProfessionalExperienceModel[];
  achievements: CandidateAchievementModel[];
  languages: CandidateLanguageModel[];
};

export default CandidateModel;
