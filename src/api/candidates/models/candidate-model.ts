/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { DataTypes, Includeable, Model } from 'sequelize'

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
import moment from 'moment'
import { UserModel } from '../../users/user-model'

export interface CandidateModelAttr {
  id: string
  userId?: string
  fullName: string
  birthDate: string
  cvUrl: string | null
  about: string | null
  contactPhone: string
  contactEmail: string
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
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
  contractTypePreference: string | null
  employmentTypePreference: string | null
  workplaceTypePreference: string | null
  benefitsPreference: string[]
  positionLevelPreference: string | null
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
    birthDate: {
      type: DataTypes.DATEONLY,
      allowNull: false,
      stringify: (value, opt) => {
        console.log(opt)
        return moment(value as Date | string).format('YYYY-MM-DD')
      },
      toString(value) {
        return moment(value as Date | string).format('YYYY-MM-DD')
      },
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

// ********* RELATIONS *********

const hasManyBaseOptions = {
  foreignKey: 'candidateId',
  onDelete: 'CASCADE',
  onUpdate: 'CASCADE',
  hooks: true,
}

UserModel.hasOne(CandidateModel, {
  onDelete: 'CASCADE',
  onUpdate: 'CASCADE',
})

CandidateModel.belongsTo(UserModel, {
  foreignKey: 'userId',
  targetKey: 'id',
})

CandidateModel.hasMany(CandidateProfessionalExperienceModel, {
  as: 'professionalExperiences',
  ...hasManyBaseOptions,
})

CandidateModel.hasMany(CandidateEducationalExperienceModel, {
  as: 'educationalExperiences',
  ...hasManyBaseOptions,
})

CandidateModel.hasMany(CandidateLanguageModel, {
  as: 'languages',
  ...hasManyBaseOptions,
})

CandidateModel.hasMany(CandidateReferenceModel, {
  as: 'references',
  ...hasManyBaseOptions,
})

CandidateModel.hasMany(CandidateAchievementModel, {
  as: 'achievements',
  ...hasManyBaseOptions,
})

CandidateProfessionalExperienceModel.belongsTo(CandidateModel, {
  foreignKey: 'candidateId',
  targetKey: 'id',
})

CandidateEducationalExperienceModel.belongsTo(CandidateModel, {
  foreignKey: 'candidateId',
  targetKey: 'id',
})

CandidateLanguageModel.belongsTo(CandidateModel, {
  foreignKey: 'candidateId',
  targetKey: 'id',
})

CandidateReferenceModel.belongsTo(CandidateModel, {
  foreignKey: 'candidateId',
  targetKey: 'id',
})

CandidateAchievementModel.belongsTo(CandidateModel, {
  foreignKey: 'candidateId',
  targetKey: 'id',
})

// ********* RELATIONS *********

// ********* HOOKS *********

const inclusions: Includeable[] = [
  { model: CandidateAchievementModel, as: 'achievements' },
  { model: CandidateEducationalExperienceModel, as: 'educationalExperiences' },
  {
    model: CandidateProfessionalExperienceModel,
    as: 'professionalExperiences',
  },
  { model: CandidateReferenceModel, as: 'references' },
  { model: CandidateLanguageModel, as: 'languages' },
]

CandidateModel.addHook('beforeFind', (opt) => {
  opt.include = inclusions
})

CandidateModel.addHook('beforeFindAfterExpandIncludeAll', (opt) => {
  opt.include = inclusions
})

CandidateModel.addHook('beforeCreate', (_, opt) => {
  opt.include = inclusions
})

// ********* HOOKS *********
