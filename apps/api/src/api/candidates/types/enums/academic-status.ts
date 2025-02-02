export const AcademicStatus = Object.freeze({
    InProgress: 'in_progress',
    Completed: 'completed',
    Locked: 'locked',
    Interrupted: 'interrupted',
});

export type AcademicStatus = (typeof AcademicStatus)[keyof typeof AcademicStatus];
