export const CrudAction = Object.freeze({
    create: 'create',
    update: 'update',
    delete: 'delete',
    readById: 'read_by_id',
    readAll: 'read_all',
});

export const CandidateAction = Object.freeze({
    candidateUpdateCv: 'candidate_update_cv',
    candidateSetBanner: 'candidate_set_banner',
});

export const UserAction = Object.freeze({
    userSetProfilePicture: 'user_set_profile_picture',
    userRequestChangePasswordToken: 'user_request_password_token',
    userChangePassword: 'user_change_password',
    userAuth: 'user_auth',
    userConfirmEmail: 'user_confirm_email',
});

export const CompanyAction = Object.freeze({
    companySetBanner: 'company_set_banner',
    companySetLogo: 'company_set_logo',
    companySetGallery: 'company_set_gallery',
    companyDeleteGallery: 'company_delete_gallery',
});

export const JobApplicationAction = Object.freeze({
    jobApplicationUpdateCoverLetter: 'job_application_update_cover_letter',
    jobApplicationUpdateStage: 'job_application_update_stage',
    jobApplicationUpdateStatus: 'job_application_update_status',
});

export const SkillAction = Object.freeze({
    skillUpdateStatus: 'skill_update_status',
});

export const Action = Object.freeze({
    ...CrudAction,
    ...CandidateAction,
    ...UserAction,
    ...CompanyAction,
    ...JobApplicationAction,
    ...SkillAction,
});

export type Action = (typeof Action)[keyof typeof Action];
