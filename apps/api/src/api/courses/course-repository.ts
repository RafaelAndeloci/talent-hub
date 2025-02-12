import { CourseModel } from './course-model';
import { CourseModelAttr } from '../../types/course-model-attr';
import { Course } from '@talent-hub/shared';
import { makeRepository } from '../../services/repository';
import { fromDatabase, toDatabase } from './course-parser';

export const courseRepository = makeRepository<Course, CourseModelAttr, CourseModel>({
    model: CourseModel,
    fromDatabase,
    toDatabase,
});
