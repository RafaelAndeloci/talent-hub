/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { DataTypes, Model } from 'sequelize'
import _ from 'lodash'

import {
  database,
  primaryColumn,
  urlColumn,
} from '../../../config/database/database'
import { EmploymentType } from '../types/enums/employment-type'
import { WorkplaceType } from '../types/enums/workplace-type'
import { PositionLevel } from '../types/enums/position-level'
import { ContractType } from '../types/enums/contract-type'
import { Benefit } from '../types/enums/benefit'
import { Address } from '../../../shared/types/address'
import {
  CandidateAchievementModel,
  CandidateAchievementModelAttr,
  CandidateEducationalExperienceModel,
  CandidateEducationalExperienceModelAttr,
  CandidateLanguageModel,
  CandidateLanguageModelAttr,
  CandidateProfessionalExperienceModel,
  CandidateProfessionalExperienceModelAttr,
  CandidateReferenceModel,
  CandidateReferenceModelAttr,
} from '.'

export interface CandidateModelAttr {
  id: string
  userId: string
  fullName: string
  birthDate: string
  cvUrl: string | null
  about: string | null
  contactPhone: string
  contactEmail: string
  address: any
  professionalHeadline: string | null
  bannerUrl: string | null
  hobbies: string[]
  linkedin: string | null
  github: string | null
  twitter: string | null
  facebook: string | null
  instagram: string | null
  youtube: string | null
  medium: string | null
  website: string | null
  isAvailableForWork: boolean
  allowThirdPartyApplications: boolean
  salaryPreference: number | null
  contractTypePreference: ContractType | null
  employmentTypePreference: EmploymentType | null
  workplaceTypePreference: WorkplaceType | null
  benefitsPreference: Benefit[]
  positionLevelPreference: PositionLevel | null
  professionalExperiences: CandidateProfessionalExperienceModelAttr[]
  educationalExperiences: CandidateEducationalExperienceModelAttr[]
  languages: CandidateLanguageModelAttr[]
  references: CandidateReferenceModelAttr[]
  achievements: CandidateAchievementModelAttr[]
}

type CandidateModelAttrInternal = Omit<
  CandidateModelAttr,
  | 'professionalExperiences'
  | 'educationalExperiences'
  | 'languages'
  | 'references'
  | 'achievements'
>

export class CandidateModel extends Model<CandidateModelAttrInternal> {}
CandidateModel.init(
  {
    id: primaryColumn,
    fullName: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    userId: {
      type: DataTypes.UUID,
      allowNull: false,
      unique: true,
    },
    birthDate: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    cvUrl: urlColumn,
    about: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    professionalHeadline: {
      type: DataTypes.STRING(100),
      allowNull: true,
    },
    bannerUrl: urlColumn,
    hobbies: {
      type: DataTypes.ARRAY(DataTypes.STRING(50)),
      allowNull: false,
      defaultValue: [],
    },
    linkedin: urlColumn,
    github: urlColumn,
    twitter: urlColumn,
    facebook: urlColumn,
    instagram: urlColumn,
    youtube: urlColumn,
    medium: urlColumn,
    website: urlColumn,
    isAvailableForWork: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true,
    },
    allowThirdPartyApplications: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true,
    },
    salaryPreference: {
      type: DataTypes.DECIMAL,
      allowNull: true,
    },
    contractTypePreference: {
      type: DataTypes.ENUM(...Object.values(ContractType)),
      allowNull: true,
    },
    employmentTypePreference: {
      type: DataTypes.ENUM(...Object.values(EmploymentType)),
      allowNull: true,
    },
    workplaceTypePreference: {
      type: DataTypes.ENUM(...Object.values(WorkplaceType)),
      allowNull: true,
    },
    benefitsPreference: {
      type: DataTypes.ARRAY(DataTypes.ENUM(...Object.values(Benefit))),
      allowNull: true,
    },
    positionLevelPreference: {
      type: DataTypes.ENUM(...Object.values(PositionLevel)),
      allowNull: true,
    },
    address: {
      type: DataTypes.JSONB,
      allowNull: true,
      validate: {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        isAddress(value: any) {
          const address: Address = {
            street: value.street,
            number: value.number,
            complement: value.complement,
            neighborhood: value.neighborhood,
            city: value.city,
            zipCode: value.zipCode,
            uf: value.uf,
          }

          if (Object.values(address).some((v) => !v)) {
            throw new Error('Invalid address')
          }
        },
      },
    },
    contactEmail: {
      type: DataTypes.STRING(100),
      allowNull: false,
      validate: {
        isEmail: true,
      },
    },
    contactPhone: {
      type: DataTypes.STRING(100),
      allowNull: false,
      validate: {
        is: /^\d{11}$/,
      },
    },
  },
  {
    sequelize: database,
    underscored: true,
    paranoid: true,
    tableName: 'candidates',
    modelName: 'Candidate',
  },
)

const inclusions = [
  {
    model: CandidateProfessionalExperienceModel,
    as: 'professionalExperiences',
  },
  {
    model: CandidateEducationalExperienceModel,
    as: 'educationalExperiences',
  },
  { model: CandidateLanguageModel, as: 'languages' },
  { model: CandidateReferenceModel, as: 'references' },
  { model: CandidateAchievementModel, as: 'achievements' },
]

CandidateModel.hasMany(CandidateProfessionalExperienceModel, {
  as: 'professionalExperiences',
  foreignKey: 'candidateId',
  onDelete: 'CASCADE',
  onUpdate: 'CASCADE',
})

CandidateProfessionalExperienceModel.belongsTo(CandidateModel, {
  foreignKey: 'candidateId',
})

CandidateModel.hasMany(CandidateEducationalExperienceModel, {
  as: 'educationalExperiences',
  foreignKey: 'candidateId',
  onDelete: 'CASCADE',
  onUpdate: 'CASCADE',
})

CandidateEducationalExperienceModel.belongsTo(CandidateModel, {
  foreignKey: 'candidateId',
})

CandidateModel.hasMany(CandidateLanguageModel, {
  as: 'languages',
  foreignKey: 'candidateId',
  onDelete: 'CASCADE',
  onUpdate: 'CASCADE',
})

CandidateLanguageModel.belongsTo(CandidateModel, {
  foreignKey: 'candidateId',
})

CandidateModel.hasMany(CandidateReferenceModel, {
  as: 'references',
  foreignKey: 'candidateId',
  onDelete: 'CASCADE',
  onUpdate: 'CASCADE',
})

CandidateReferenceModel.belongsTo(CandidateModel, {
  foreignKey: 'candidateId',
})

CandidateModel.hasMany(CandidateAchievementModel, {
  as: 'achievements',
  foreignKey: 'candidateId',
  onDelete: 'CASCADE',
  onUpdate: 'CASCADE',
})

CandidateAchievementModel.belongsTo(CandidateModel, {
  foreignKey: 'candidateId',
})

CandidateModel.prototype.toJSON = function () {
  const candidate = this.get() as CandidateModelAttrInternal

  return _.omit(candidate, ['createdAt', 'updatedAt', 'deletedAt', 'userId'])
}

CandidateModel.beforeFind((options) => {
  options.include = inclusions
})

CandidateModel.beforeFindAfterExpandIncludeAll((options) => {
  options.include = inclusions
})

CandidateModel.beforeFindAfterOptions((options) => {
  options.include = inclusions
})

CandidateModel.beforeCreate((_, opt) => {
  opt.include = inclusions
  opt.returning = true
})

CandidateModel.beforeUpdate((_, opt) => {
  opt.returning = true
})
