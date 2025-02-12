import { CreateCoursePayload } from './create-course-payload';

export type UpdateCoursePayload = Omit<CreateCoursePayload, 'institution'>;
