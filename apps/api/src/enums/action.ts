export const Action = Object.freeze({
    create: 'create',
    update: 'update',
    delete: 'delete',
    readById: 'read_by_id',
    readAll: 'read_all',
    updateCandidateCv: 'update_candidate_cv',
    setCandidateBanner: 'set_candidate_banner',
    setUserProfilePicture: 'set_user_profile_picture',
    sendUserChangePasswordToken: 'send_user_change_password_token',
    userAuthentication: 'user_authentication',
    confirmUserEmail: 'confirm_user_email',
    confirmUserChangePassword: 'confirm_user_change_password',
    setCompanyBanner: 'set_company_banner',
    setCompanyLogo: 'set_company_logo',
    setCompanyGallery: 'set_company_gallery',
    deleteCompanyGallery: 'delete_company_gallery',
});

export const AllActions = Object.freeze(Object.values(Action)) as Action[];

export type Action = (typeof Action)[keyof typeof Action];
