export const Action = Object.freeze({
  create: 'create',
  update: 'update',
  delete: 'delete',
  readById: 'read_by_id',
  readAll: 'read_all',
  updateCandidateCv: 'update_candidate_cv',
  updateCandidateBanner: 'update_candidate_banner',
  updateUserProfilePicture: 'update_user_profile_picture',
  resetUserPassword: 'reset_user_password',
})

export type Action = (typeof Action)[keyof typeof Action]
