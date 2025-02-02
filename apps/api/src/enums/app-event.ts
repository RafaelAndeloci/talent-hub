export const AppEvent = Object.freeze({
    // users
    userCreated: 'user_created',
    userPasswordChanged: 'user_password_changed',
    userPasswordResetTokenRequested: 'user_password_reset_token_requested',
    userEmailConfirmed: 'user_email_confirmed',

    // job applications
    jobApplicationCreated: 'job_application_created',
    jobApplicationRemoved: 'job_application_removed',
    jobApplicationStatusUpdated: 'job_application_status_updated',
    jobApplicationStageUpdated: 'job_application_stage_updated',

    // job openings
    jobOpeningCreated: 'job_opening_created',
    jobOpeningUpdated: 'job_opening_updated',
    jobOpeningRemoved: 'job_opening_removed',
});

export type AppEvent = (typeof AppEvent)[keyof typeof AppEvent];
