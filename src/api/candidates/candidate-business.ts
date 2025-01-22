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
import WhereOptions from '../../types/where-options';
import FilterOperator from '../users/types/filter-operator';
import fileStorageService from '../../services/file-storage-service';

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
    const where: WhereOptions<CandidateModel> = {};
    for (const filter of props.filters) {
      if (!filter.field.includes('address')) {
        continue;
      }

      where['address'] = {
        path: [filter.field.split('.')[1]],
        [filter.operator === FilterOperator.contains
          ? 'string_contains'
          : filter.operator]: filter.value,
      };

      props.filters = props.filters.filter(f => f.field !== filter.field);
    }

    const candidates = await candidateRepository.findAll({
      ...props,
      where,
    });
    return candidates.parse(parse);
  },

  async create({ userId, payload }) {
    if (
      !(await userRepository.exists({
        id: userId,
      }))
    ) {
      ApiError.throwBadRequest(`invalid user`);
    }

    if (
      await candidateRepository.exists({
        OR: [{ userId }, { phone: payload.phone }],
      })
    ) {
      ApiError.throwBadRequest('candidate already exists');
    }

    const candidate = {
      ...payload,
      id: uuid.v4(),
      userId: userId,
    };

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
        payload.languages?.map((l: CandidateLanguageModel) => {
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

  async updateCv({ candidateId, file }) {
    const candidate = await candidateRepository.findById(candidateId);
    if (!candidate) {
      ApiError.throwNotFound(`candidate with id ${candidateId} not found`);
    }

    const existingCvKey = candidate.cvUrl?.split('/').pop();
    if (existingCvKey) {
      await fileStorageService.delete({ key: existingCvKey });
    }

    const exposeUrl = await fileStorageService.upload({
      key: `CANDIDATE-${candidateId}-CV.${file.mimetype.split('/')[1]}`,
      file: file.buffer,
      contentType: file.mimetype,
    });

    const updated = await candidateRepository.update({
      ...candidate,
      cvUrl: exposeUrl,
    });

    return parse(updated);
  },
};

export default candidateBusiness;
