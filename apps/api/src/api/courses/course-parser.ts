import {
    Course,
    CourseDto,
    CreateCoursePayload,
    generateUUID,
    Role,
    SuggestionStatus,
    User,
    UserDto,
} from '@talent-hub/shared';
import _ from 'lodash';
import { CourseModelAttr } from '../../types/course-model-attr';

export const toDto = (c: Course): CourseDto => _.omit(c, ['validation']);

export const fromDatabase = (c: CourseModelAttr): Course => ({
    ...c,
    validation:
        c.validatedAt && c.validatedBy
            ? {
                  by: c.validatedBy,
                  at: c.validatedAt,
              }
            : null,
    institution: {
        id: c.institutionId,
        name: c.institutionName!,
    },
});

export const toDatabase = (c: Course): CourseModelAttr => ({
    ...c,
    institutionId: c.institution.id,
    validatedBy: c.validation?.by ?? null,
    validatedAt: c.validation?.at ?? null,
});

export const newInstance = ({
    payload,
    user,
}: {
    payload: CreateCoursePayload;
    user: User | UserDto;
}): Course => ({
    id: generateUUID(),
    ...payload,
    ...(user.role === Role.SysAdmin
        ? {
              validation: {
                  by: user.id,
                  at: new Date(),
              },
              status: SuggestionStatus.Approved,
          }
        : {
              validation: null,
              status: SuggestionStatus.Pending,
          }),
});
