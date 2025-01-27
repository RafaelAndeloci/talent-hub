export const JobOpeningStatus = Object.freeze({
  draft: 'draft',
  paused: 'paused',
  open: 'open',
  closed: 'closed',
  filled: 'filled',
})

export type JobOpeningStatus =
  (typeof JobOpeningStatus)[keyof typeof JobOpeningStatus]
