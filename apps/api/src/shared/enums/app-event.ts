export const AppEvent = Object.freeze({
  // users
  userCreated: 'user_created',
  userPasswordReset: 'user_reset_password',

  // job applications
  jobApplicationCreated: 'job_application_created',
  jobApplicationUpdated: 'job_application_updated',
  jobApplicationRemoved: 'job_application_removed',

  // job openings
  jobOpeningCreated: 'job_opening_created',
  jobOpeningUpdated: 'job_opening_updated',
  jobOpeningRemoved: 'job_opening_removed',
})

export type AppEvent = (typeof AppEvent)[keyof typeof AppEvent]
