import { CourseDto } from './course-dto';

export type CreateCoursePayload = Omit<CourseDto, 'id' | 'institution' | 'status'> & {
    institution: {
        id: string;
    };
};
