import { RequestHandler } from 'express';
import { courseRepository } from './course-repository';
import {
    AuthContext,
    Course,
    CourseDto,
    CreateCoursePayload,
    FindAllArgs,
    Id,
    PagedResponse,
    SuggestionStatus,
    UpdateCoursePayload,
} from '@talent-hub/shared';
import { newInstance, toDto } from './course-parser';
import { academicInstitutionRepository } from '../academic-institutions/academic-institution-repository';
import { ApiError } from '../../types/api-error';
import _ from 'lodash';

export const findById: RequestHandler<Id, CourseDto, void, void, AuthContext> = async (
    req,
    res,
) => {
    const course = await courseRepository.findById(req.params.id);
    if (!course) {
        ApiError.throwNotFound('Course not found');
        return;
    }
    
    res.json(toDto(course));
};

export const findAll: RequestHandler<
    void,
    PagedResponse<CourseDto>,
    void,
    FindAllArgs<CourseDto>,
    AuthContext
> = async (req, res) => {
    const courses = await courseRepository.findAll(req.query as unknown as FindAllArgs<Course>);
    res.json(courses.parse(toDto));
};

export const create: RequestHandler<
    void,
    CourseDto,
    CreateCoursePayload,
    void,
    AuthContext
> = async (req, res) => {
    const academicInstitution = await academicInstitutionRepository.findById(
        req.body.institution.id,
    );
    if (academicInstitution === null) {
        ApiError.throwNotFound('Academic institution not found');
        return;
    }

    if (academicInstitution.status === SuggestionStatus.Rejected) {
        ApiError.throwBadRequest('Academic institution is not approved');
        return;
    }

    if (
        await courseRepository.exists({
            institutionId: req.body.institution.id,
            name: req.body.name,
        })
    ) {
        ApiError.throwBadRequest('Course already exists');
        return;
    }

    const course = newInstance({
        payload: req.body,
        user: res.locals.user,
    });

    await courseRepository.create(course);

    res.json(toDto(course));
};

export const update: RequestHandler<Id, CourseDto, UpdateCoursePayload, void, AuthContext> = async (
    req,
    res,
) => {
    let course = await courseRepository.findById(req.params.id);
    if (!course) {
        ApiError.throwNotFound('Course not found');
        return;
    }

    if ([SuggestionStatus.Pending, SuggestionStatus.Rejected].includes(course.status)) {
        ApiError.throwBadRequest('Course is not approved');
        return;
    }

    const academicInstitution = await academicInstitutionRepository.findById(course.institution.id);

    if (academicInstitution === null) {
        ApiError.throwNotFound('Academic institution not found');
        return;
    }

    if (academicInstitution.status === SuggestionStatus.Rejected) {
        ApiError.throwBadRequest('Academic institution is not approved');
        return;
    }

    if (
        await courseRepository.exists({
            institutionId: course.institution.id,
            name: req.body.name,
        })
    ) {
        ApiError.throwBadRequest('Course already exists');
        return;
    }

    course = _.merge(course, req.body);

    await courseRepository.update(course);

    res.json(toDto(course));
};

export const remove: RequestHandler<Id, void, void, void, AuthContext> = async (req, res) => {
    const course = await courseRepository.findById(req.params.id);
    if (!course) {
        ApiError.throwNotFound('Course not found');
        return;
    }

    await courseRepository.deleteById(course.id);

    res.status(204).end();
};
