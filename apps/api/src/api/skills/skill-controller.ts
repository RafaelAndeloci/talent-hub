import HTTPStatus from 'http-status';
import * as uuid from 'uuid';

import { jobQueueService } from '../../services/job-queue-service';
import { AppEvent } from '../../enums/app-event';
import { SkillController } from '../../types/skill-controller';
import { skillRepository } from './skill-repository';
import { FindAllArgs, Skill, Role, SuggestionStatus } from '@talent-hub/shared/types';
import { ApiError } from '../../types/api-error';
import { skillParser } from './skill-parser';

export const skillController: SkillController = {
    findAll: async ({ query }, res) => {
        const skills = await skillRepository
            .findAll(query as unknown as FindAllArgs<Skill>)
            .then((result) => result.parse(skillParser.toDto));

        res.status(HTTPStatus.OK).json(skills);
    },

    findById: async ({ params: { id } }, res) => {
        const skill = await skillRepository
            .findById(id)
            .then((result) => skillParser.toDto(result));

        res.status(HTTPStatus.OK).json(skill);
    },

    create: async ({ body: payload }, res) => {
        const isAdmin = res.locals.user.role === Role.SysAdmin;

        const skill: Skill = {
            id: uuid.v4(),
            ...payload,
            status: isAdmin ? SuggestionStatus.Approved : SuggestionStatus.Pending,
            suggestedBy: res.locals.user.id,
            validation: isAdmin
                ? {
                      by: res.locals.user.id,
                      at: new Date(),
                  }
                : null,
        };

        await skillRepository.create(skill);

        res.status(HTTPStatus.CREATED).json(skillParser.toDto(skill));
    },

    update: async ({ params: { id }, body: payload }, res) => {
        const skill = await skillRepository.findById(id);

        if (!skill) {
            res.status(HTTPStatus.NOT_FOUND).send();
            return;
        }

        await skillRepository.update({
            ...skill,
            ...payload,
        });

        res.status(HTTPStatus.NO_CONTENT).send();
    },

    remove: async ({ params: { id } }, res) => {
        await skillRepository.deleteById(id);

        res.status(HTTPStatus.NO_CONTENT).send();
    },

    updateStatus: async ({ params: { id }, body: payload }, res) => {
        const skill = await skillRepository.findById(id);
        if (!skill) {
            ApiError.throwNotFound(`skill with id ${id} not found`);
        }

        if (skill.status === payload.status) {
            ApiError.throwConflict(`skill ${skill.name} already has status ${payload.status}`);
        }

        skill.status = payload.status;

        await skillRepository.update(skill);

        await jobQueueService.enqueue({
            event: AppEvent.skillStatusUpdated,
            payload: {
                skillId: id,
            },
        });

        res.status(HTTPStatus.OK).json(skillParser.toDto(skill));
    },
};
