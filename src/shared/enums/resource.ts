export const Resource = Object.freeze({
  candidates: 'candidates',
  users: 'users',
  companies: 'companies',
  jobOpportunities: 'job_opportunities',
  jobApplications: 'job_applications',
})

export type Resource = (typeof Resource)[keyof typeof Resource]
