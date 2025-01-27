import { DataTypes, Model } from 'sequelize'
import { database, primaryColumn } from '../../../config/database/database'
import { PositionLevel } from '../types/enums/position-level'
import { WorkplaceType } from '../types/enums/workplace-type'
import { EmploymentType } from '../types/enums/employment-type'

export interface CandidateProfessionalExperienceModelAttr {
  id?: string
  title: string
  description: string | null
  company: string
  employmentType: EmploymentType
  workplaceType: WorkplaceType
  positionLevel: PositionLevel
  isCurrent: boolean
  startYear: number
  startMonth: number
  endYear: number | null
  endMonth: number | null
  location: object | null
  relatedSkills: string[]
}

export class CandidateProfessionalExperienceModel extends Model<CandidateProfessionalExperienceModelAttr> {}

CandidateProfessionalExperienceModel.init(
  {
    id: primaryColumn,
    title: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    company: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    employmentType: {
      type: DataTypes.ENUM(...Object.values(EmploymentType)),
      allowNull: false,
    },
    workplaceType: {
      type: DataTypes.ENUM(...Object.values(WorkplaceType)),
      allowNull: false,
    },
    positionLevel: {
      type: DataTypes.ENUM(...Object.values(PositionLevel)),
      allowNull: false,
    },
    isCurrent: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
    startYear: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        min: 1900,
        max: 2100,
      },
    },
    startMonth: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        min: 1,
        max: 12,
      },
    },
    endYear: {
      type: DataTypes.INTEGER,
      allowNull: true,
      validate: {
        min: 1900,
        max: 2100,
      },
    },
    endMonth: {
      type: DataTypes.INTEGER,
      allowNull: true,
      validate: {
        min: 1,
        max: 12,
      },
    },
    location: {
      type: DataTypes.JSONB,
      allowNull: true,
    },
    relatedSkills: {
      type: DataTypes.ARRAY(DataTypes.STRING(50)),
      allowNull: false,
      defaultValue: [],
    },
  },
  {
    sequelize: database,
    underscored: true,
    tableName: 'candidate_professional_experiences',
    modelName: 'CandidateProfessionalExperience',
  },
)
