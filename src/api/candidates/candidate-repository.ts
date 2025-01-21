import repositoryFactory from '../../services/repository-factory';
import * as uuid from 'uuid';
import CandidateModel from './types/candidate-model';

const candidateRepository = repositoryFactory.buildFor<CandidateModel>({
  modelName: 'Candidate',
  inclusions: {
    academicExperiences: {
      include: {
        projects: true,
      },
    },
    professionalExperiences: true,
    skills: true,
    languages: true,
    achievements: true,
    references: true,
  },
  toUpdateTransform: data => ({
    ...data,
    academicExperiences: {
      deleteMany: {
        id: {
          notIn: data.academicExperiences.map((a: any) => a.id),
        },
      },
      upsert: data.academicExperiences.map((a: any) => {
        delete a.candidateId;
        return {
          where: { id: a.id || uuid.v4() },
          create: {
            ...a,
            projects: {
              create: a.projects,
            },
          },
          update: {
            ...a,
            projects: {
              deleteMany: {
                id: {
                  notIn: a.projects.map((p: any) => p.id),
                },
              },
              upsert: a.projects.map((p: any) => {
                delete p.academicExperienceId;
                return {
                  where: { id: p.id || uuid.v4() },
                  create: p,
                  update: p,
                };
              }),
            },
          },
        };
      }),
    },
    references: {
      deleteMany: {
        id: {
          notIn: data.references.map((r: any) => r.id),
        },
      },
      upsert: data.references.map((r: any) => {
        delete r.candidateId;
        return {
          where: { id: r.id || uuid.v4() },
          create: r,
          update: r,
        };
      }),
    },
    professionalExperiences: {
      deleteMany: {
        id: {
          notIn: data.professionalExperiences.map((p: any) => p.id),
        },
      },
      upsert: data.professionalExperiences.map((p: any) => {
        delete p.candidateId;
        p.id = p.id || uuid.v4();
        return {
          where: { id: p.id },
          create: p,
          update: p,
        };
      }),
    },
    skills: {
      deleteMany: {
        id: {
          notIn: data.skills.map((s: any) => s.id),
        },
      },
      upsert: data.skills.map((s: any) => {
        delete s.candidateId;
        return {
          where: { id: s.id || uuid.v4() },
          create: s,
          update: s,
        };
      }),
    },
    languages: {
      deleteMany: {
        id: {
          notIn: data.languages.map((l: any) => l.id),
        },
      },
      upsert: data.languages.map((l: any) => {
        delete l.candidateId;
        return {
          where: { id: l.id || uuid.v4() },
          create: l,
          update: l,
        };
      }),
    },
    achievements: {
      deleteMany: {
        id: {
          notIn: data.achievements.map((a: any) => a.id),
        },
      },
      upsert: data.achievements.map((a: any) => {
        delete a.candidateId;
        return {
          where: { id: a.id || uuid.v4() },
          create: a,
          update: a,
        };
      }),
    },
  }),
  toCreateTransform: data => ({
    ...data,
    id: uuid.v4(),
    academicExperiences: {
      create: data.academicExperiences.map((a: any) => ({
        ...a,
        id: uuid.v4(),
        projects: {
          create: a.projects,
        },
      })),
    },
    references: {
      create: data.references.map((r: any) => ({
        ...r,
        id: uuid.v4(),
      })),
    },
    professionalExperiences: {
      create: data.professionalExperiences.map((p: any) => ({
        ...p,
        id: uuid.v4(),
      })),
    },
    skills: {
      create: data.skills.map((s: any) => ({
        ...s,
        id: uuid.v4(),
      })),
    },
    languages: {
      create: data.languages.map((l: any) => ({
        ...l,
        id: uuid.v4(),
      })),
    },
    achievements: {
      create: data.achievements.map((a: any) => ({
        ...a,
        id: uuid.v4(),
      })),
    },
  }),
});

export default candidateRepository;
