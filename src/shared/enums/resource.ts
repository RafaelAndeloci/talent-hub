export const Resource = Object.freeze({
  candidates: 'candidates',
  users: 'users',
})

export type Resource = (typeof Resource)[keyof typeof Resource]
