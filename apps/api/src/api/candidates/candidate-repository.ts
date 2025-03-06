import { Candidate } from '@talent-hub/shared';
import { Repository } from '../../services/repository';
import {
    AcademicBackgroundModel,
    AcademicBackgroundModelAttr,
    AchievementModel,
    AchievementModelAttr,
    CandidateLanguageModel,
    CandidateLanguageModelAttr,
    CandidateModel,
    CandidateModelAttr,
    CandidateReferenceModel,
    CandidateReferenceModelAttr,
    CandidateSkillModel,
    CandidateSkillModelAttr,
    ProfessionalExperienceModel,
    ProfessionalExperienceModelAttr,
} from './candidate-model';
import { CandidateParser } from './candidate-parser';
import { Transaction } from 'sequelize';
import database from '../../config/database';

export class CandidateRepository extends Repository<Candidate, CandidateModelAttr, CandidateModel> {
    constructor() {
        super(CandidateModel, CandidateParser);
    }

    override async create({
        entity,
        transaction,
    }: {
        entity: Candidate;
        transaction?: Transaction;
    }): Promise<void> {
        transaction = transaction || (await database.transaction());

        try {
            const {
                academicBackgrounds,
                professionalExperiences,
                languages,
                references,
                achievements,
                skills,
                ...candidate
            } = CandidateParser.toDb(entity);

            await CandidateModel.create(candidate, { transaction });
            await this.createAssociations({
                academicBackgrounds,
                professionalExperiences,
                languages,
                references,
                achievements,
                skills,
                transaction,
            });

            (transaction as Transaction).commit();
        } catch (error) {
            await (transaction as Transaction).rollback();
            throw error;
        }
    }

    override async update({
        entity,
        transaction,
    }: {
        entity: Candidate;
        transaction?: Transaction;
    }): Promise<void> {
        const t: Transaction = transaction || (await database.transaction());

        try {
            const {
                academicBackgrounds,
                professionalExperiences,
                languages,
                references,
                achievements,
                skills,
                ...candidate
            } = CandidateParser.toDb(entity);

            await CandidateModel.update(candidate, {
                where: { id: entity.id },
                transaction,
            });

            await this.destroyAssociations(entity.id, t);
            await this.createAssociations({
                academicBackgrounds,
                professionalExperiences,
                languages,
                references,
                achievements,
                skills,
                transaction: t,
            });

            t.commit();
        } catch (error) {
            if (!transaction) {
                await t.rollback();
            }

            throw error;
        }
    }

    private async createAssociations({
        academicBackgrounds,
        professionalExperiences,
        languages,
        references,
        achievements,
        skills,
        transaction,
    }: {
        academicBackgrounds: AcademicBackgroundModelAttr[];
        professionalExperiences: ProfessionalExperienceModelAttr[];
        languages: CandidateLanguageModelAttr[];
        references: CandidateReferenceModelAttr[];
        achievements: AchievementModelAttr[];
        skills: CandidateSkillModelAttr[];
        transaction: Transaction;
    }): Promise<void> {
        try {
            await AcademicBackgroundModel.bulkCreate(academicBackgrounds, { transaction });
            await ProfessionalExperienceModel.bulkCreate(professionalExperiences, { transaction });
            await CandidateLanguageModel.bulkCreate(languages, { transaction });
            await CandidateReferenceModel.bulkCreate(references, { transaction });
            await CandidateSkillModel.bulkCreate(skills, { transaction });
            await AchievementModel.bulkCreate(achievements, { transaction });
            transaction.commit();
        } catch (error) {
            await (transaction as Transaction).rollback();
            throw error;
        }
    }

    private async destroyAssociations(
        candidateId: string,
        transaction: Transaction,
    ): Promise<void> {
        try {
            await AcademicBackgroundModel.destroy({ where: { candidateId }, transaction });
            await ProfessionalExperienceModel.destroy({ where: { candidateId }, transaction });
            await CandidateLanguageModel.destroy({ where: { candidateId }, transaction });
            await CandidateReferenceModel.destroy({ where: { candidateId }, transaction });
            await CandidateSkillModel.destroy({ where: { candidateId }, transaction });
            await AchievementModel.destroy({ where: { candidateId }, transaction });
            transaction.commit();
        } catch (error) {
            await (transaction as Transaction).rollback();
            throw error;
        }
    }
}
