/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-explicit-any */

import { DataTypes, Model } from 'sequelize'
import { database, primaryColumn } from '../../../config/database/database'
import { Language } from '../../../shared/enums/language'
import { LanguageProficiency } from '../types/enums/language-proficiency'

export interface CandidateLanguageModelAttr {
  id?: string
  language: string
  writtenLevel: string
  spokenLevel: string
  readingLevel: string
  listeningLevel: string
}

export class CandidateLanguageModel extends Model<CandidateLanguageModelAttr> {}

CandidateLanguageModel.init(
  {
    id: primaryColumn,
    language: {
      type: DataTypes.ENUM(...Object.values(Language)),
      allowNull: false,
    },
    writtenLevel: {
      type: DataTypes.ENUM(...Object.values(LanguageProficiency)),
      allowNull: false,
    },
    spokenLevel: {
      type: DataTypes.ENUM(...Object.values(LanguageProficiency)),
      allowNull: false,
    },
    readingLevel: {
      type: DataTypes.ENUM(...Object.values(LanguageProficiency)),
      allowNull: false,
    },
    listeningLevel: {
      type: DataTypes.ENUM(...Object.values(LanguageProficiency)),
      allowNull: false,
    },
  },
  {
    sequelize: database,
    underscored: true,
    tableName: 'candidate_languages',
    modelName: 'CandidateLanguage',
  },
)
