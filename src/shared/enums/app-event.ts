export const AppEvent = Object.freeze({
  // users
  UserCreated: 'user_created',
  UserResetPassword: 'user_reset_password',
})

export type AppEvent = (typeof AppEvent)[keyof typeof AppEvent]
