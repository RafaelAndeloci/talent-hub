export const LanguageProficiency = Object.freeze({
  Basic: 'basic',
  Intermediate: 'intermediate',
  Advanced: 'advanced',
  Fluent: 'fluent',
  Native: 'native',
})

export type LanguageProficiency =
  (typeof LanguageProficiency)[keyof typeof LanguageProficiency]
