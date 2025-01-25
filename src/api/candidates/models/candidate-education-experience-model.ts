import { DataTypes, Model } from 'sequelize'
import { AcademicStatus } from '../types/enums/academic-status'
import { AcademicDegreeType } from '../types/enums/academic-degree-type'
import {
  database,
  primaryColumn,
  urlColumn,
} from '../../../config/database/database'

export interface CandidateEducationalExperienceModelAttr {
  id?: string
  degree: string
  fieldOfStudy: string
  status: string
  type: string
  institution: string
  institutionWebsite: string | null
  description: string | null
  startYear: number
  startMonth: number
  endYear: number | null
  endMonth: number | null
  isCurrent: boolean
  semesters: number | null
  currentSemester: number | null
  institutionRegistrationNumber: string | null
  gradePointAverage: number | null
  expectedGraduationYear: number | null
  expectedGraduationMonth: number | null
}

export class CandidateEducationalExperienceModel extends Model<CandidateEducationalExperienceModelAttr> {}

CandidateEducationalExperienceModel.init(
  {
    id: primaryColumn,
    degree: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    fieldOfStudy: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    status: {
      type: DataTypes.ENUM(...Object.values(AcademicStatus)),
      allowNull: false,
    },
    type: {
      type: DataTypes.ENUM(...Object.values(AcademicDegreeType)),
      allowNull: false,
    },
    institution: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    institutionWebsite: urlColumn,
    description: {
      type: DataTypes.TEXT,
      allowNull: true,
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
    isCurrent: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
    semesters: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    currentSemester: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    institutionRegistrationNumber: {
      type: DataTypes.STRING(100),
      allowNull: true,
    },
    gradePointAverage: {
      type: DataTypes.DECIMAL,
      allowNull: true,
    },
    expectedGraduationYear: {
      type: DataTypes.INTEGER,
      allowNull: true,
      validate: {
        min: 1900,
        max: 2100,
      },
    },
    expectedGraduationMonth: {
      type: DataTypes.INTEGER,
      allowNull: true,
      validate: {
        min: 1,
        max: 12,
      },
    },
  },
  {
    sequelize: database,
    underscored: true,
    tableName: 'candidate_educational_experiences',
    modelName: 'CandidateEducationalExperience',
  },
)
