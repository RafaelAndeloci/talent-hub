import { Course, CourseDto, CoursePayload, DbParser, newUUID, UserDto } from '@talent-hub/shared';
import { CourseModelAttr } from './course-model';
import {
    fromPlainSuggestion,
    makeSuggestionForUser,
    plainSuggestion,
} from '../../utils/suggestion-util';

type CourseParser = DbParser<Course, CourseModelAttr> & {
    newInstance: (args: { payload: CoursePayload; user: UserDto }) => Course;

    toDto: (data: Course) => CourseDto;
};

export const CourseParser: CourseParser = {
    toDb: (course) => ({
        ...course,
        ...plainSuggestion(course.suggestion),
    }),

    fromDb: (course) => ({
        ...course,
        suggestion: fromPlainSuggestion({
            status: course.status,
            suggestedAt: course.suggestedAt,
            suggestedBy: course.suggestedBy,
            validatedAt: course.validatedAt,
            validatedBy: course.validatedBy,
        }),
    }),

    newInstance: ({ payload, user }) => ({
        id: newUUID(),
        ...payload,
        suggestion: makeSuggestionForUser(user),
    }),

    toDto: ({ suggestion: { status }, ...rest }) => ({ ...rest, status }),
};
