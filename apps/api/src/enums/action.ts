export const Action = Object.freeze({
    create: 'create',
    update: 'update',
    delete: 'delete',
    readById: 'read_by_id',
    readAll: 'read_all',
    updateCandidateCv: 'update_candidate_cv',
    updateCandidateBanner: 'update_candidate_banner',
    updateUserProfilePicture: 'update_user_profile_picture',
    sendUserChangePasswordToken: 'send_user_change_password_token',
    userAuthentication: 'user_authentication',
    confirmUserChangePassword: 'confirm_user_change_password',
});

export const AllActions = Object.freeze(Object.values(Action)) as Action[];

export type Action = (typeof Action)[keyof typeof Action];
