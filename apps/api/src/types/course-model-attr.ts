import { Course } from '@talent-hub/shared';

export type CourseModelAttr = Omit<Course, 'validation' | 'institution'> & {
    validatedBy: string | null;
    validatedAt: Date | null;
    institutionId: string;
    institutionName?: string;
};
