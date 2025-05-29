import { z } from 'zod'

export enum Language {
  English = 'Inglês',
  Spanish = 'Espanhol',
  French = 'Francês',
  German = 'Alemão',
  Italian = 'Italiano',
  Chinese = 'Chinês',
  Japanese = 'Japonês',
  Korean = 'Coreano',
  Russian = 'Russo',
  Portuguese = 'Português',
}

export enum LanguageProficiency {
  Basic = 'Básico',
  Intermediate = 'Intermediário',
  Advanced = 'Avançado',
  Fluent = 'Fluente',
  Native = 'Nativo',
}

export const languageProficiencySchema = z.enum([
  'Basic',
  'Intermediate',
  'Advanced',
  'Fluent',
  'Native',
])

export const languageSchema = z.enum([
  'English',
  'Spanish',
  'French',
  'German',
  'Italian',
  'Chinese',
  'Japanese',
  'Korean',
  'Russian',
  'Portuguese',
])
