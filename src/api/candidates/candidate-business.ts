import ApiError from '../../types/api-error';
import candidateRepository from './candidate-repository';
import CandidateBusiness from './types/candidate-business';
import * as uuid from 'uuid';
import userRepository from '../users/user-repository';
import _ from 'lodash';
import {
  Candidate,
  CandidateAchievement,
  CandidateProfessionalExperience,
  CandidateRefence,
  CandidateSkill,
} from './types/candidate';
import CandidateModel, {
  CandidateAcademicExperienceModel,
  CandidateAcademicExperienceProjectModel,
  CandidateAchievementModel,
  CandidateLanguageModel,
  CandidateProfessionalExperienceModel,
  CandidateReferenceModel,
  CandidateSkillModel,
} from './types/candidate-model';
import { CandidateAcademicExperience } from './types/candidate';

const removeKeys = (model: any) => {
  delete model.id;
  delete model.candidateId;

  return model;
};

const parse = (model: CandidateModel): Candidate => ({
  ...model,
  skills: model.skills.map(removeKeys),
  references: model.references.map(removeKeys),
  academicExperiences: model.academicExperiences.map(a => {
    const withoutKeys = removeKeys(a);

    return {
      ...withoutKeys,
      projects: withoutKeys.projects.map((p: any) => {
        delete p.id;
        delete p.academicExperienceId;

        return p;
      }),
    };
  }),
  professionalExperiences: model.professionalExperiences.map(removeKeys),
  achievements: model.achievements.map(removeKeys),
  languages: model.languages.map(removeKeys),
});

const candidateBusiness: CandidateBusiness = {
  async findById(id) {
    const candidate = await candidateRepository.findById(id);
    if (!candidate) {
      ApiError.throwNotFound(`candidate with id ${id} not found`);
    }

    return parse(candidate);
  },

  async findAll(props) {
    const candidates = await candidateRepository.findAll(props as any);
    return candidates.parse(parse);
  },

  async create(payload) {
    if (
      !(await userRepository.exists({
        id: payload.userId,
      }))
    ) {
      ApiError.throwBadRequest(`invalid user`);
    }

    if (
      await candidateRepository.exists({
        OR: [{ userId: payload.userId }, { phone: payload.phone }],
      })
    ) {
      ApiError.throwBadRequest('candidate already exists');
    }

    const candidate = {
      ...payload,
      id: uuid.v4(),
    } as Candidate;

    return parse(await candidateRepository.create(candidate as any));
  },

  async update({ id, payload }) {
    const candidate = await candidateRepository.findById(id);
    if (!candidate) {
      ApiError.throwNotFound(`candidate with id ${id} not found`);
    }
    const updated: CandidateModel = {
      ...candidate,
      ...payload,
      languages:
        payload.languages?.map(l => {
          const existing = candidate.languages.find(
            e => e.language === l.language,
          );

          return {
            ...existing,
            ...l,
            id: existing?.id || uuid.v4(),
          } as unknown as CandidateLanguageModel;
        }) ?? ([] as CandidateLanguageModel[]),
      professionalExperiences:
        payload.professionalExperiences?.map(
          (a: CandidateProfessionalExperience) => {
            const existing = candidate.professionalExperiences.find(
              e => e.position === a.position && e.companyName === a.companyName,
            );

            return {
              ...existing,
              ...a,
              id: existing?.id || uuid.v4(),
            } as unknown as CandidateProfessionalExperienceModel;
          },
        ) ?? ([] as CandidateProfessionalExperienceModel[]),
      skills:
        payload.skills?.map((s: CandidateSkill) => {
          const existing = candidate.skills.find(e => e.name === s.name);

          return {
            ...existing,
            ...s,
            id: existing?.id || uuid.v4(),
          } as unknown as CandidateSkillModel;
        }) ?? ([] as CandidateSkillModel[]),
      achievements:
        payload.achievements?.map((a: CandidateAchievement) => {
          const existing = candidate.achievements.find(
            e => e.title === a.title,
          );

          return {
            ...existing,
            ...a,
            id: existing?.id || uuid.v4(),
          } as unknown as CandidateAchievementModel;
        }) ?? ([] as CandidateAchievementModel[]),
      references:
        payload.references?.map((r: CandidateRefence) => {
          const existing = candidate.references.find(e => e.name === r.name);

          return {
            ...existing,
            ...r,
            id: existing?.id || uuid.v4(),
          } as unknown as CandidateReferenceModel;
        }) ?? ([] as CandidateReferenceModel[]),
      academicExperiences:
        payload.academicExperiences?.map((a: CandidateAcademicExperience) => {
          const existing = candidate.academicExperiences.find(
            e => e.name === a.name,
          );

          return {
            ...existing,
            ...a,
            id: existing?.id || uuid.v4(),
            projects: a.projects?.map((p: any) => {
              const existingP = existing?.projects.find(e => e.name === p.name);

              return {
                ...existingP,
                ...p,
                id: existingP?.id || uuid.v4(),
              } as unknown as CandidateAcademicExperienceProjectModel;
            }),
          } as unknown as CandidateAcademicExperienceModel;
        }) ?? ([] as CandidateAcademicExperienceModel[]),
    };

    return parse(await candidateRepository.update(updated));
  },

  async remove(id) {
    const candidate = await candidateRepository.findById(id);
    if (!candidate) {
      ApiError.throwNotFound(`candidate with id ${id} not found`);
    }

    await candidateRepository.remove(id);
  },
};

export default candidateBusiness;
