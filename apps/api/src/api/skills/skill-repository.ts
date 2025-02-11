import { Op } from 'sequelize';
import { makeRepository } from '../../services/repository';
import { RelatedSkillModel, SkillModel } from './skill-model';
import { skillParser } from './skill-parser';
import { ApiError } from '../../types/api-error';
import database from '../../config/database';
import { logger } from '../../services/logging-service';
import { Skill, SuggestionStatus } from '@talent-hub/shared';
import { SkillModelAttr } from '../../types/skill-model-attr';

const validateRelatedSkills = async (relatedSkills: string[]) => {
    if (relatedSkills.length) {
        const existingRelatedSkills = await skillRepository.exists({
            [Op.and]: {
                id: { [Op.in]: relatedSkills },
                status: SuggestionStatus.Approved,
            },
        });

        if (!existingRelatedSkills) {
            ApiError.throwBadRequest('related skills not found');
        }
    }
};

const handleRelatedSkills = async (skillId: string, relatedSkills: string[], transaction: any) => {
    await RelatedSkillModel.destroy({ where: { skillId }, transaction });

    if (relatedSkills.length) {
        await RelatedSkillModel.bulkCreate(
            relatedSkills.map((relatedSkillId) => ({
                skillId,
                relatedSkillId,
            })),
            { transaction },
        );
    }
};

export const skillRepository = {
    ...makeRepository<Skill, SkillModelAttr, SkillModel>({
        model: SkillModel,
        fromDatabase: skillParser.fromDatabase,
        toDatabase: skillParser.toDatabase,
    }),
    create: async (skill: Skill) => {
        await validateRelatedSkills(skill.relatedSkills);

        const t = await database.transaction();

        try {
            await SkillModel.create(skill, { transaction: t });
            await handleRelatedSkills(skill.id, skill.relatedSkills, t);
            t.commit();
        } catch (error) {
            logger.error(error);
            t.rollback();
            ApiError.throwInternalServerError('failed to create skill');
        }
    },

    update: async (skill: Skill) => {
        await validateRelatedSkills(skill.relatedSkills);

        const t = await database.transaction();

        try {
            await SkillModel.update(skill, { where: { id: skill.id }, transaction: t });
            await handleRelatedSkills(skill.id, skill.relatedSkills, t);
            t.commit();
        } catch (error) {
            logger.error(error);
            t.rollback();
            ApiError.throwInternalServerError('failed to update skill');
        }
    },
};
