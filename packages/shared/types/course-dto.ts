import { Course } from './course';

export type CourseDto = Omit<Course, 'validation'>;
