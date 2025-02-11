/* eslint-disable @typescript-eslint/no-explicit-any */
import { Transaction } from 'sequelize';
import * as uuid from 'uuid';

import { makeRepository } from '../../services/repository';
import { CandidateModel } from './models';
import { candidateParser } from './candidate-parser';
import models from '../../config/database/models';
import { CandidateModelAttr } from '../../types/candidate-model-attr';
import { Candidate } from '@talent-hub/shared/types';
import { CandidateAchievementModelAttr } from '../../types/candidate-achievement-model-attr';
import { CandidateEducationalExperienceModelAttr } from '../../types/candidate-education-experience-model-attr';
import { CandidateLanguageModelAttr } from '../../types/candidate-language-model-attr';
import { CandidateProfessionalExperienceModelAttr } from '../../types/candidate-professional-experience-model-attr';
import { CandidateReferenceModelAttr } from '../../types/candidate-reference-model-attr';

const baseRepo = makeRepository<Candidate, CandidateModelAttr, CandidateModel>({
    model: CandidateModel,
    fromDatabase: candidateParser.fromDatabase,
    toDatabase: candidateParser.toDatabase,
});

const bulkCreateCandidateComposites = async (
    transaction: Transaction,
    candidateId: string,
    professionalExperiences: CandidateProfessionalExperienceModelAttr[],
    educationalExperiences: CandidateEducationalExperienceModelAttr[],
    languages: CandidateLanguageModelAttr[],
    references: CandidateReferenceModelAttr[],
    achievements: CandidateAchievementModelAttr[],
) => {
    const bulkInsert = async (model: any, data: any[]) => {
        if (data.length) {
            await model.bulkCreate(
                data.map((item) => ({ ...item, candidateId, id: uuid.v4() })),
                { transaction },
            );
        }
    };

    await bulkInsert(models.CandidateProfessionalExperience, professionalExperiences);
    await bulkInsert(models.CandidateEducationalExperience, educationalExperiences);
    await bulkInsert(models.CandidateLanguage, languages);
    await bulkInsert(models.CandidateReference, references);
    await bulkInsert(models.CandidateAchievement, achievements);
};

export const candidateRepository = {
    ...baseRepo,
    create: async (candidate: Candidate): Promise<void> => {
        const attr = candidateParser.toDatabase(candidate);

        const transaction = await models.sequelize.transaction({
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

    bulkCreate: async (candidates: Candidate[]): Promise<void> => {
        const transaction = await models.sequelize.transaction({
            autocommit: false,
        });

        try {
            const attrs = candidates.map(candidateParser.toDatabase);

            await CandidateModel.bulkCreate(attrs, {
                transaction,
            });

            await models.CandidateProfessionalExperience.bulkCreate(
                attrs.flatMap((attr) =>
                    attr.professionalExperiences.map((item) => ({
                        ...item,
                        candidateId: attr.id,
                        id: uuid.v4(),
                    })),
                ),
                { transaction },
            );

            await models.CandidateEducationalExperience.bulkCreate(
                attrs.flatMap((attr) =>
                    attr.educationalExperiences.map((item) => ({
                        ...item,
                        candidateId: attr.id,
                        id: uuid.v4(),
                    })),
                ),
                { transaction },
            );

            await models.CandidateLanguage.bulkCreate(
                attrs.flatMap((attr) =>
                    attr.languages.map((item) => ({
                        ...item,
                        candidateId: attr.id,
                        id: uuid.v4(),
                    })),
                ),
                { transaction },
            );

            await models.CandidateReference.bulkCreate(
                attrs.flatMap((attr) =>
                    attr.references.map((item) => ({
                        ...item,
                        candidateId: attr.id,
                        id: uuid.v4(),
                    })),
                ),
                { transaction },
            );

            await models.CandidateAchievement.bulkCreate(
                attrs.flatMap((attr) =>
                    attr.achievements.map((item) => ({
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

    update: async (candidate: Candidate): Promise<void> => {
        const attr = candidateParser.toDatabase(candidate);
        const {
            professionalExperiences,
            educationalExperiences,
            languages,
            references,
            achievements,
            ...candidateAttr
        } = attr;

        const transaction = await models.sequelize.transaction();

        try {
            await CandidateModel.update(candidateAttr, {
                where: { id: candidate.id },
                transaction,
            });

            const bulkDelete = async (model: any) => {
                await model.destroy({
                    where: { candidateId: candidate.id },
                    transaction,
                });
            };

            await bulkDelete(models.CandidateProfessionalExperience);
            await bulkDelete(models.CandidateEducationalExperience);
            await bulkDelete(models.CandidateLanguage);
            await bulkDelete(models.CandidateReference);
            await bulkDelete(models.CandidateAchievement);

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
