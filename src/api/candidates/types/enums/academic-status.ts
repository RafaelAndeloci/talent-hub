export const AcademicStatus = Object.freeze({
  Ongoing: 'ongoing',
  Completed: 'completed',
  Locked: 'locked',
  Interrupted: 'interrupted',
})

export type AcademicStatus =
  (typeof AcademicStatus)[keyof typeof AcademicStatus]
