export const EmploymentType = Object.freeze({
  Internship: 'internship',
  Freelancer: 'freelancer',
  Effective: 'effective',
  Temporary: 'temporary',
  Trainee: 'trainee',
})

export type EmploymentType =
  (typeof EmploymentType)[keyof typeof EmploymentType]
