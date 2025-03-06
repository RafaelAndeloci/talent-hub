import { RequestHandler } from 'express';
import {
    PagedResponse,
    QueryArgs,
    Skill,
    SkillDto,
    SkillPayload,
    UpdateSkillStatusPayload,
    UserDto,
} from '@talent-hub/shared';
import { SkillRepository } from './skill-repository';
import { SkillParser } from './skill-parser';
import HTTPStatus from 'http-status';
import { Op } from 'sequelize';
import moment from 'moment';

export class SkillController {
    constructor(private skillRepository = new SkillRepository()) {}

    findAll: RequestHandler<{}, PagedResponse<SkillDto>, null, QueryArgs<Skill>, {}> = async (
        { query },
        res,
    ) => {
        const skills = await this.skillRepository
            .findAll(query)
            .then((result) => result.parse(SkillParser.toDto));

        res.status(HTTPStatus.OK).json(skills);
    };

    findById: RequestHandler<{ id: string }, SkillDto | null, null, {}, {}> = async (
        { params: { id } },
        res,
    ) => {
        const skill = await this.skillRepository.findById(id);
        if (!skill) {
            res.status(HTTPStatus.NOT_FOUND).send();
            return;
        }

        res.status(HTTPStatus.OK).json(SkillParser.toDto(skill));
    };

    create: RequestHandler<{}, SkillDto, SkillPayload, {}, UserDto> = async (req, res) => {
        const exists = await this.skillRepository.exists({
            name: req.body.name,
            type: req.body.type,
        });
        if (exists) {
            res.status(HTTPStatus.CONFLICT).send();
            return;
        }

        const skill = SkillParser.newInstance({
            payload: req.body,
            user: res.locals,
        });

        await this.skillRepository.create({ entity: skill });

        res.status(HTTPStatus.CREATED).json(SkillParser.toDto(skill));
    };

    update: RequestHandler<{ id: string }, void, SkillPayload, {}, {}> = async (req, res) => {
        const skill = await this.skillRepository.findById(req.params.id);
        if (!skill) {
            res.status(HTTPStatus.NOT_FOUND).send();
            return;
        }

        const exists = await this.skillRepository.exists({
            [Op.and]: [
                { name: req.body.name },
                { type: req.body.type },
                { id: { [Op.ne]: req.params.id } },
            ],
        });

        if (exists) {
            res.status(HTTPStatus.CONFLICT).send();
            return;
        }

        const updated: Skill = {
            id: skill.id,
            ...req.body,
            suggestion: skill.suggestion,
        };

        await this.skillRepository.update({
            entity: updated,
        });

        res.status(HTTPStatus.NO_CONTENT).send();
    };

    remove: RequestHandler<{ id: string }, void, null, {}, {}> = async (req, res) => {
        await this.skillRepository.deleteById({ id: req.params.id });
        res.status(HTTPStatus.NO_CONTENT).send();
    };

    updateStatus: RequestHandler<{ id: string }, SkillDto, UpdateSkillStatusPayload, {}, UserDto> =
        async (req, res) => {
            const skill = await this.skillRepository.findById(req.params.id);
            if (!skill) {
                res.status(HTTPStatus.NOT_FOUND).send();
                return;
            }

            if (skill.suggestion.status === req.body.status) {
                res.status(HTTPStatus.CONFLICT).send();
                return;
            }

            skill.suggestion.status = req.body.status;
            skill.suggestion.validation = {
                by: res.locals.id,
                at: moment(),
            };

            await this.skillRepository.update({
                entity: skill,
            });

            res.status(HTTPStatus.OK).json(SkillParser.toDto(skill));
        };
}
