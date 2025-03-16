import {
    Course,
    CourseDto,
    CoursePayload,
    PagedResponse,
    QueryArgs,
    SuggestionStatus,
    UpdateStatusPayload,
    UserDto,
} from '@talent-hub/shared';
import { RequestHandler } from 'express';
import { CourseRepository } from './course-repository';
import { CourseParser } from './course-parser';
import ApiError from '../../utils/api-error';
import HTTPStatus from 'http-status';

export class CourseController {
    constructor(private readonly courseRepository = new CourseRepository()) {}

    findById: RequestHandler<{ id: string }, CourseDto, void, void, UserDto> = async (req, res) => {
        const course = await this.courseRepository.findById(req.params.id);
        if (!course) {
            res.status(404).end();
            return;
        }

        res.json(CourseParser.toDto(course));
    };

    findAll: RequestHandler<void, PagedResponse<CourseDto>, void, QueryArgs<Course>, UserDto> =
        async (req, res) => {
            const courses = await this.courseRepository.findAll(req.query);
            res.json(courses.parse(CourseParser.toDto));
        };

    create: RequestHandler<void, CourseDto, CourseDto, void, UserDto> = async (req, res) => {
        const alreadyExists = await this.courseRepository.exists({
            name: req.body.name,
            degreeType: req.body.degreeType,
        });
        if (alreadyExists) {
            ApiError.throwBadRequest('Course already exists');
        }

        const course = CourseParser.newInstance({
            payload: req.body,
            user: res.locals,
        });

        await this.courseRepository.create({ entity: course });

        res.status(HTTPStatus.CREATED).json(CourseParser.toDto(course));
    };

    update: RequestHandler<{ id: string }, CourseDto, CoursePayload, void, UserDto> = async (
        req,
        res,
    ) => {
        let course = await this.courseRepository.findById(req.params.id);
        if (!course) {
            res.status(404).end();
            return;
        }

        if (course.suggestion.status !== SuggestionStatus.Approved) {
            ApiError.throwBadRequest('Course is not approved');
        }

        course = { ...course, ...req.body };

        await this.courseRepository.update({ entity: course });

        res.json(CourseParser.toDto(course));
    };

    remove: RequestHandler<{ id: string }, void, void, void, UserDto> = async (req, res) => {
        const course = await this.courseRepository.findById(req.params.id);
        if (!course) {
            res.status(404).end();
            return;
        }

        await this.courseRepository.deleteById({ id: course.id });

        res.status(204).end();
    };

    updateStatus: RequestHandler<
        { id: string } & UpdateStatusPayload,
        CourseDto,
        void,
        void,
        UserDto
    > = async (req, res) => {
        let course = await this.courseRepository.findById(req.params.id);
        if (!course) {
            res.status(404).end();
            return;
        }

        course = { ...course, suggestion: { ...course.suggestion, status: req.params.status } };

        await this.courseRepository.update({ entity: course });

        res.json(CourseParser.toDto(course));
    };
}
