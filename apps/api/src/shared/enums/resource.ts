export const Resource = Object.freeze({
  candidates: 'candidates',
  users: 'users',
  companies: 'companies',
  jobOpenings: 'job_openings',
  jobApplications: 'job_applications',
})

export type Resource = (typeof Resource)[keyof typeof Resource]
