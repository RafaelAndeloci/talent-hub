import { Course, CoursePayload, SuggestionStatus, UserDto } from '@talent-hub/shared';
import { CourseModelAttr } from './course-model';
import * as uuid from 'uuid';
import { Role } from '@talent-hub/shared/types/role';
import moment from 'moment';

type CourseParser = {
    fromDatabase: (course: CourseModelAttr) => Course;
    toDatabase: (course: Course) => CourseModelAttr;
    newInstance: (args: { payload: CoursePayload; user: UserDto }) => Course;
};

export const CourseParser: CourseParser = {
    fromDatabase: (course) => ({
        id: course.id,
        name: course.name,
        degreeType: course.degreeType,
        suggestion: {
            validation:
                course.validatedAt && course.validatedBy
                    ? {
                          by: course.validatedBy,
                          at: course.validatedAt,
                      }
                    : null,
            status: course.status,
        },
    }),
    toDatabase: (course) => ({
        id: course.id,
        name: course.name,
        degreeType: course.degreeType,
        validatedBy: course.suggestion.validation?.by || null,
        validatedAt: course.suggestion.validation?.at || null,
        status: course.suggestion.status,
    }),
    newInstance: ({ payload, user }) => ({
        id: uuid.v4(),
        name: payload.name,
        degreeType: payload.degreeType,
        suggestion:
            user.role === Role.SysAdmin
                ? {
                      status: SuggestionStatus.Approved,
                      validation: { by: user.id, at: moment() },
                  }
                : {
                      status: SuggestionStatus.Pending,
                      validation: null,
                  },
    }),
};
