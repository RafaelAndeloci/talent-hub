import { DataTypes, Model } from 'sequelize'
import {
  database,
  primaryColumn,
  urlColumn,
} from '../../../config/database/database'
import { AchievementType } from '../types/enums/achievement-type'

export interface CandidateAchievementModelAttr {
  id?: string
  name: string
  type: string
  issuer: string
  issueYear: number
  issueMonth: number
  expirationYear: number | null
  expirationMonth: number | null
  credentialId: string | null
  credentialUrl: string | null
  relatedSkills: string[]
}

export class CandidateAchievementModel extends Model<CandidateAchievementModelAttr> {}

CandidateAchievementModel.init(
  {
    id: primaryColumn,
    name: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    type: {
      type: DataTypes.ENUM(...Object.values(AchievementType)),
      allowNull: false,
    },
    issuer: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    issueMonth: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        min: 1,
        max: 12,
      },
    },
    issueYear: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        min: 1900,
        max: 2100,
      },
    },
    expirationMonth: {
      type: DataTypes.INTEGER,
      allowNull: true,
      validate: {
        min: 1,
        max: 12,
      },
    },
    expirationYear: {
      type: DataTypes.INTEGER,
      allowNull: true,
      validate: {
        min: 1900,
        max: 2100,
      },
    },
    credentialId: {
      type: DataTypes.STRING(100),
      allowNull: true,
    },
    credentialUrl: urlColumn,
    relatedSkills: {
      type: DataTypes.ARRAY(DataTypes.STRING(50)),
      allowNull: false,
      defaultValue: [],
    },
  },
  {
    sequelize: database,
    underscored: true,
    tableName: 'candidate_achievements',
    modelName: 'CandidateAchievement',
  },
)
