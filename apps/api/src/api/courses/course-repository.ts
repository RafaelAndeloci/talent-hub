import { CourseModel, CourseModelAttr } from './course-model';
import { Course } from '@talent-hub/shared';
import { Repository } from '../../services/repository';
import { CourseParser } from './course-parser';

export class CourseRepository extends Repository<Course, CourseModelAttr, CourseModel> {
    constructor() {
        super(CourseModel, CourseParser);
    }
}
