/* eslint-disable @typescript-eslint/no-explicit-any */
import { Transaction } from 'sequelize';
import * as uuid from 'uuid';

import { makeRepository } from '../../services/repository';
import { Candidate } from './types/candidate';
import { models } from '../../config/database/models';
import { CandidateProfessionalExperienceModelAttr } from './models/types/candidate-professional-experience-model-attr';
import { CandidateModel } from './models';
import { CandidateAchievementModelAttr } from './models/types/candidate-achievement-model-attr';
import { CandidateEducationalExperienceModelAttr } from './models/types/candidate-education-experience-model-attr';
import { CandidateLanguageModelAttr } from './models/types/candidate-language-model-attr';
import { CandidateModelAttr } from './models/types/candidate-model-attr';
import { CandidateReferenceModelAttr } from './models/types/candidate-reference-model-attr';
import { candidateParser } from './candidate-parser';

const baseRepo = makeRepository<Candidate, CandidateModelAttr, CandidateModel>({
    model: CandidateModel,
    fromDatabase: candidateParser.fromDatabase,
    toDatabase: candidateParser.toDatabase,
});

const bulkCreateCandidateComposites = async(
    transaction: Transaction,
    candidateId: string,
    professionalExperiences: CandidateProfessionalExperienceModelAttr[],
    educationalExperiences: CandidateEducationalExperienceModelAttr[],
    languages: CandidateLanguageModelAttr[],
    references: CandidateReferenceModelAttr[],
    achievements: CandidateAchievementModelAttr[],
) => {
    const bulkInsert = async(model: any, data: any[]) => {
        if (data.length) {
            await model.bulkCreate(
                data.map(item => ({ ...item, candidateId, id: uuid.v4() })),
                { transaction },
            );
        }
    };

    await bulkInsert(models.Candidates.ProfessionalExperiences, professionalExperiences);
    await bulkInsert(models.Candidates.EducationalExperiences, educationalExperiences);
    await bulkInsert(models.Candidates.Languages, languages);
    await bulkInsert(models.Candidates.References, references);
    await bulkInsert(models.Candidates.Achievements, achievements);
};

export const candidateRepository = {
    ...baseRepo,
    create: async(candidate: Candidate): Promise<void> => {
        const attr = candidateParser.toDatabase(candidate);

        const transaction = await models.database.transaction({
            autocommit: false,
        });

        try {
            await CandidateModel.create(attr, {
                transaction,
            });

            await bulkCreateCandidateComposites(
                transaction,
                candidate.id,
                attr.professionalExperiences,
                attr.educationalExperiences,
                attr.languages,
                attr.references,
                attr.achievements,
            );

            await transaction.commit();
        } catch (error) {
            await transaction.rollback();
            throw error;
        }
    },

    bulkCreate: async(candidates: Candidate[]): Promise<void> => {
        const transaction = await models.database.transaction({
            autocommit: false,
        });

        try {
            const attrs = candidates.map(candidateParser.toDatabase);

            await CandidateModel.bulkCreate(attrs, {
                transaction,
            });

            await models.Candidates.ProfessionalExperiences.bulkCreate(
                attrs.flatMap(attr =>
                    attr.professionalExperiences.map(item => ({
                        ...item,
                        candidateId: attr.id,
                        id: uuid.v4(),
                    })),
                ),
                { transaction },
            );

            await models.Candidates.EducationalExperiences.bulkCreate(
                attrs.flatMap(attr =>
                    attr.educationalExperiences.map(item => ({
                        ...item,
                        candidateId: attr.id,
                        id: uuid.v4(),
                    })),
                ),
                { transaction },
            );

            await models.Candidates.Languages.bulkCreate(
                attrs.flatMap(attr =>
                    attr.languages.map(item => ({
                        ...item,
                        candidateId: attr.id,
                        id: uuid.v4(),
                    })),
                ),
                { transaction },
            );

            await models.Candidates.References.bulkCreate(
                attrs.flatMap(attr =>
                    attr.references.map(item => ({
                        ...item,
                        candidateId: attr.id,
                        id: uuid.v4(),
                    })),
                ),
                { transaction },
            );

            await models.Candidates.Achievements.bulkCreate(
                attrs.flatMap(attr =>
                    attr.achievements.map(item => ({
                        ...item,
                        candidateId: attr.id,
                        id: uuid.v4(),
                    })),
                ),
                { transaction },
            );

            await transaction.commit();
        } catch (error) {
            await transaction.rollback();
            throw error;
        }
    },

    update: async(candidate: Candidate): Promise<void> => {
        const attr = candidateParser.toDatabase(candidate);
        const {
            professionalExperiences,
            educationalExperiences,
            languages,
            references,
            achievements,
            ...candidateAttr
        } = attr;

        const transaction = await models.database.transaction();

        try {
            await CandidateModel.update(candidateAttr, {
                where: { id: candidate.id },
                transaction,
            });

            const bulkDelete = async(model: any) => {
                await model.destroy({
                    where: { candidateId: candidate.id },
                    transaction,
                });
            };

            await bulkDelete(models.Candidates.ProfessionalExperiences);
            await bulkDelete(models.Candidates.EducationalExperiences);
            await bulkDelete(models.Candidates.Languages);
            await bulkDelete(models.Candidates.References);
            await bulkDelete(models.Candidates.Achievements);

            await bulkCreateCandidateComposites(
                transaction,
                candidate.id,
                professionalExperiences,
                educationalExperiences,
                languages,
                references,
                achievements,
            );

            await transaction.commit();
        } catch (error) {
            await transaction.rollback();
            throw error;
        }
    },
};
