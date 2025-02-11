export enum Action {
    // CrudAction
    Create = 'create',
    update = 'update',
    delete = 'delete',
    ReadById = 'read_by_id',
    ReadAll = 'read_all',

    // CandidateAction
    candidateUpdateCv = 'candidate_update_cv',
    candidateSetBanner = 'candidate_set_banner',

    // UserAction
    UserSetProfilePicture = 'user_set_profile_picture',
    UserRequestChangePasswordToken = 'user_request_password_token',
    userChangePassword = 'user_change_password',
    UserAuth = 'user_auth',
    UserConfirmEmail = 'user_confirm_email',

    // CompanyAction
    companySetBanner = 'company_set_banner',
    companySetLogo = 'company_set_logo',
    companySetGallery = 'company_set_gallery',
    companyDeleteGallery = 'company_delete_gallery',

    // JobApplicationAction
    jobApplicationUpdateCoverLetter = 'job_application_update_cover_letter',
    jobApplicationUpdateStage = 'job_application_update_stage',
    jobApplicationUpdateStatus = 'job_application_update_status',

    // SkillAction
    skillUpdateStatus = 'skill_update_status',
}
