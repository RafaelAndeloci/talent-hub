import { Op, Transaction } from 'sequelize';
import {
    JobOpeningModel,
    JobOpeningModelAttr,
    SkillProfileModel,
    LanguageProficiencyProfileModel,
    CourseProfileModel,
} from './job-opening-model';
import { Repository } from '../../services/repository';
import { JobOpeningParser } from './job-opening-parser';
import { JobOpening, JobOpeningStatus } from '@talent-hub/shared';

export class JobOpeningRepository extends Repository<
    JobOpening,
    JobOpeningModelAttr,
    JobOpeningModel
> {
    constructor() {
        super(JobOpeningModel, JobOpeningParser);
    }

    override async create({
        entity,
        transaction,
    }: {
        entity: JobOpening;
        transaction?: Transaction;
    }) {
        const t = transaction || (await JobOpeningModel.sequelize!.transaction());

        try {
            const model = JobOpeningParser.toDb(entity);

            await JobOpeningModel.create(model, { transaction: t });
            await SkillProfileModel.bulkCreate(model.desiredSkills, { transaction: t });
            await LanguageProficiencyProfileModel.bulkCreate(model.desiredLanguages, {
                transaction: t,
            });
            await CourseProfileModel.bulkCreate(model.desiredCourses, { transaction: t });

            if (!transaction) {
                await t.commit();
            }
        } catch (error) {
            if (!transaction) {
                await t.rollback();
            }
            throw error;
        }
    }

    override async update({
        entity,
        transaction,
    }: {
        entity: JobOpening;
        transaction?: Transaction;
    }) {
        const t: Transaction = transaction || (await JobOpeningModel.sequelize!.transaction());

        try {
            const model = JobOpeningParser.toDb(entity);

            await JobOpeningModel.update(model, {
                where: { id: entity.id },
                transaction: t,
            });

            await SkillProfileModel.destroy({ where: { jobOpeningId: entity.id }, transaction: t });
            await LanguageProficiencyProfileModel.destroy({
                where: { jobOpeningId: entity.id },
                transaction: t,
            });
            await CourseProfileModel.destroy({
                where: { jobOpeningId: entity.id },
                transaction: t,
            });

            await SkillProfileModel.bulkCreate(model.desiredSkills, { transaction: t });
            await LanguageProficiencyProfileModel.bulkCreate(model.desiredLanguages, {
                transaction: t,
            });
            await CourseProfileModel.bulkCreate(model.desiredCourses, { transaction: t });

            if (!transaction) {
                await t.commit();
            }
        } catch (error) {
            if (!transaction) {
                await t.rollback();
            }
            throw error;
        }
    }

    async existsByPosition({
        position,
        companyId,
    }: {
        position: string;
        companyId: string;
    }): Promise<boolean> {
        return (
            (await JobOpeningModel.count({
                where: {
                    [Op.and]: [
                        { companyId },
                        { position },
                        {
                            status: {
                                [Op.not]: [JobOpeningStatus.Closed, JobOpeningStatus.Filled],
                            },
                        },
                    ],
                },
            })) > 0
        );
    }
}
