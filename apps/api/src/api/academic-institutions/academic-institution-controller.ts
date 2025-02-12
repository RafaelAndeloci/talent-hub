import {
    AcademicInstitution,
    AcademicInstitutionDto,
    AuthContext,
    CreateAcademicInstitutionPayload,
    Filter,
    FindAllArgs,
    Id,
    PagedResponse,
    UpdateAcademicInstitutionPayload,
} from '@talent-hub/shared';
import { RequestHandler } from 'express';
import { academicInstitutionRepository } from './academic-institution-repository';
import { AcademicInstitutionParser } from './academic-institution-parser';
import { ApiError } from '../../types/api-error';
import HttpStatus from 'http-status';
import _ from 'lodash';

export const findById: RequestHandler<Id, AcademicInstitutionDto, void, void, AuthContext> = async (
    req,
    res,
) => {
    const { id } = req.params;
    const academicInstitution = await academicInstitutionRepository.findById(id);
    res.json(AcademicInstitutionParser.toDto(academicInstitution));
};

export const findAll: RequestHandler<
    void,
    PagedResponse<AcademicInstitutionDto>,
    void,
    FindAllArgs<AcademicInstitutionDto>,
    AuthContext
> = async (req, res) => {
    const { limit, offset, sort, filter } = req.query;

    const academicInstitutions = await academicInstitutionRepository.findAll({
        limit,
        offset,
        sort,
        filter: filter as unknown as Filter<AcademicInstitution>[],
    });

    res.json(academicInstitutions.parse(AcademicInstitutionParser.toDto));
};

export const create: RequestHandler<
    void,
    AcademicInstitutionDto,
    CreateAcademicInstitutionPayload,
    void,
    AuthContext
> = async (req, res) => {
    const alreadyExists = await academicInstitutionRepository.exists({
        name: req.body.name,
    });
    if (alreadyExists) {
        ApiError.throwConflict('academic institution already exists.');
    }

    const academicInstitution = AcademicInstitutionParser.newInstance({
        payload: req.body,
        userRole: res.locals.user.role,
    });

    await academicInstitutionRepository.create(academicInstitution);

    res.status(HttpStatus.CREATED).json(academicInstitution);
};

export const update: RequestHandler<
    Id,
    AcademicInstitutionDto,
    UpdateAcademicInstitutionPayload,
    void,
    AuthContext
> = async (req, res) => {
    const alreadyExists = await academicInstitutionRepository.exists({
        name: req.body.name,
    });
    if (alreadyExists) {
        ApiError.throwConflict('academic institution already exists.');
    }

    let academicInstitution = await academicInstitutionRepository.findById(req.params.id);
    academicInstitution = _.merge(academicInstitution, req.body);

    await academicInstitutionRepository.update(academicInstitution);

    res.status(HttpStatus.OK).json(academicInstitution);
};

export const remove: RequestHandler<Id, void, void, void, AuthContext> = async (req, res) => {
    if (
        !(await academicInstitutionRepository.exists({
            id: req.params.id,
        }))
    ) {
        ApiError.throwNotFound('academic institution not found')
    }

    await academicInstitutionRepository.deleteById(req.params.id);

    res.sendStatus(HttpStatus.OK)
};
