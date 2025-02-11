export enum AppEvent {
    // users
    UserCreated = 'user_created',
    UserPasswordChanged = 'user_password_changed',
    UserPasswordResetTokenRequested = 'user_password_reset_token_requested',
    UserEmailConfirmed = 'user_email_confirmed',

    // job applications
    JobApplicationCreated = 'job_application_created',
    JobApplicationRemoved = 'job_application_removed',
    JobApplicationStatusUpdated = 'job_application_status_updated',
    JobApplicationStageUpdated = 'job_application_stage_updated',

    // job openings
    JobOpeningCreated = 'job_opening_created',
    JobOpeningUpdated = 'job_opening_updated',
    JobOpeningRemoved = 'job_opening_removed',
    JobOpeningClosed = 'job_opening_closed',
    JobOpeningOpened = 'job_opening_opened',
    JobOpeningFilled = 'job_opening_filled',

    // skills
    SkillStatusUpdated = 'skill_status_updated',
}
