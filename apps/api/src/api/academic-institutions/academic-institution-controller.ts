import { RequestHandler } from 'express';
import HttpStatus from 'http-status';

import {
    AcademicInstitution,
    AcademicInstitutionDto,
    PagedResponse,
    QueryArgs,
    UpdateAcademicInstitutionStatusPayload,
    UserDto,
} from '@talent-hub/shared';

import AcademicInstitutionRepository from './academic-institution-repository';
import { AcademicInstitutionParser } from './academic-institution-parser';

export default class AcademicInstitutionController {
    constructor(private academicInstitutionRepository = new AcademicInstitutionRepository()) {}

    findById: RequestHandler<
        { id: string },
        AcademicInstitutionDto,
        void,
        void,
        { user: UserDto }
    > = async (req, res) => {
        const { id } = req.params;
        const academicInstitution = await this.academicInstitutionRepository.findById(id);
        if (!academicInstitution) {
            res.sendStatus(HttpStatus.NOT_FOUND);
            return;
        }

        res.json(AcademicInstitutionParser.toDto(academicInstitution));
    };

    findAll: RequestHandler<
        void,
        PagedResponse<AcademicInstitutionDto>,
        void,
        QueryArgs<AcademicInstitution>,
        UserDto
    > = async (req, res) => {
        const { limit, offset, sort, filter } = req.query;

        const academicInstitutions = await this.academicInstitutionRepository.findAll({
            limit,
            offset,
            sort,
            filter: filter,
        });

        res.json(academicInstitutions.parse(AcademicInstitutionParser.toDto));
    };

    create: RequestHandler<void, AcademicInstitutionDto, AcademicInstitution, void, UserDto> =
        async (req, res) => {
            const alreadyExists = await this.academicInstitutionRepository.exists({
                name: req.body.name,
            });
            if (alreadyExists) {
                res.sendStatus(HttpStatus.CONFLICT);
                return;
            }

            const academicInstitution = AcademicInstitutionParser.newInstance({
                payload: req.body,
                user: res.locals,
            });

            await this.academicInstitutionRepository.create({
                entity: academicInstitution,
            });

            res.status(HttpStatus.CREATED).json(
                AcademicInstitutionParser.toDto(academicInstitution),
            );
        };

    update: RequestHandler<
        { id: string },
        AcademicInstitutionDto,
        AcademicInstitution,
        void,
        UserDto
    > = async (req, res) => {
        const alreadyExists = await this.academicInstitutionRepository.exists({
            name: req.body.name,
        });
        if (alreadyExists) {
            res.sendStatus(HttpStatus.CONFLICT);
            return;
        }

        let academicInstitution = await this.academicInstitutionRepository.findById(req.params.id);
        if (!academicInstitution) {
            res.sendStatus(HttpStatus.NOT_FOUND);
            return;
        }

        academicInstitution = { ...academicInstitution, ...req.body };

        await this.academicInstitutionRepository.update({
            entity: academicInstitution,
        });

        res.status(HttpStatus.OK).json(AcademicInstitutionParser.toDto(academicInstitution));
    };

    remove: RequestHandler<{ id: string }, void, void, void, UserDto> = async (req, res) => {
        if (!(await this.academicInstitutionRepository.exists({ id: req.params.id }))) {
            res.sendStatus(HttpStatus.NOT_FOUND);
            return;
        }

        await this.academicInstitutionRepository.deleteById({
            id: req.params.id,
        });

        res.sendStatus(HttpStatus.OK);
    };

    updateStatus: RequestHandler<
        { id: string },
        AcademicInstitutionDto,
        UpdateAcademicInstitutionStatusPayload,
        void,
        UserDto
    > = async (req, res) => {
        let academicInstitution = await this.academicInstitutionRepository.findById(req.params.id);
        if (!academicInstitution) {
            res.sendStatus(HttpStatus.NOT_FOUND);
            return;
        }

        academicInstitution.suggestion.status = req.body.status;

        await this.academicInstitutionRepository.update({
            entity: academicInstitution,
        });

        res.status(HttpStatus.OK).json(AcademicInstitutionParser.toDto(academicInstitution));
    };
}
