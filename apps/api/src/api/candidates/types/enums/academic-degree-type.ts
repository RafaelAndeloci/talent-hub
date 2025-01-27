export const AcademicDegreeType = Object.freeze({
  ElementarySchool: 'elementary_school',
  HighSchool: 'high_school',
  Technical: 'technical',
  Technologist: 'technologist',
  Bachelor: 'bachelor',
  Master: 'master',
  Doctorate: 'doctorate',
  Licentiate: 'licentiate',
  Specialization: 'specialization',
  Other: 'other',
})

export type AcademicDegreeType =
  (typeof AcademicDegreeType)[keyof typeof AcademicDegreeType]
