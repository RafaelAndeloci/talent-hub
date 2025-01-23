import { DataTypes, Includeable, Model } from 'sequelize'
import {
  database,
  primaryColumn,
  urlColumn,
} from '../../config/database/database'
import { Language } from '../../shared/enums/language'
import { LanguageProficiency } from './types/enums/language-proficiency'
import { AchievementType } from './types/enums/achievement-type'
import { AcademicStatus } from './types/enums/academic-status'
import { AcademicDegreeType } from './types/enums/academic-degree-type'
import { EmploymentType } from './types/enums/employment-type'
import { WorkplaceType } from './types/enums/workplace-type'
import { PositionLevel } from './types/enums/position-level'
import { UserModel } from '../users/user-model'
import { ContractType } from './types/enums/contract-type'
import { Benefit } from './types/enums/benefit'
import { Address } from '../../shared/types/address'

interface CandidateLanguageModelAttributes {
  id: string
  candidateId: string
  language: string
  writtenLevel: string
  spokenLevel: string
  readingLevel: string
  listeningLevel: string
}

class CandidateLanguageModel extends Model<CandidateLanguageModelAttributes> {}

CandidateLanguageModel.init(
  {
    id: primaryColumn,
    candidateId: {
      type: DataTypes.UUID,
      allowNull: false,
    },
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

interface CandidateReferenceModelAttributes {
  id: string
  candidateId: string
  name: string
  position: string
  company: string | null
  email: string
  phone: string
  relationship: string
}

class CandidateReferenceModel extends Model<CandidateReferenceModelAttributes> {}

CandidateReferenceModel.init(
  {
    id: primaryColumn,
    candidateId: {
      type: DataTypes.UUID,
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    position: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    company: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    phone: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    relationship: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
  },
  {
    sequelize: database,
    underscored: true,
    tableName: 'candidate_references',
    modelName: 'CandidateReference',
  },
)

interface CandidateAchievementModelAttributes {
  id: string
  candidateId: string
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

class CandidateAchievementModel extends Model<CandidateAchievementModelAttributes> {}

CandidateAchievementModel.init(
  {
    id: primaryColumn,
    candidateId: {
      type: DataTypes.UUID,
      allowNull: false,
    },
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

interface CandidateEducationalExperienceModelAttributes {
  id: string
  candidateId: string
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

class CandidateEducationalExperienceModel extends Model<CandidateEducationalExperienceModelAttributes> {}

CandidateEducationalExperienceModel.init(
  {
    id: primaryColumn,
    candidateId: {
      type: DataTypes.UUID,
      allowNull: false,
    },
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

export interface CandidateProfessionalExperienceModelAttributes {
  id: string
  candidateId: string
  title: string
  description: string | null
  company: string
  employmentType: string
  workplaceType: string
  positionLevel: string
  isCurrent: boolean
  startYear: number
  startMonth: number
  endYear: number | null
  endMonth: number | null
  location: object | null
  relatedSkills: string[]
}

class CandidateProfessionalExperienceModel extends Model<CandidateProfessionalExperienceModelAttributes> {}

CandidateProfessionalExperienceModel.init(
  {
    id: primaryColumn,
    candidateId: {
      type: DataTypes.UUID,
      allowNull: false,
    },
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

export interface CandidateModelAttributes {
  id: string
  fullName: string
  birthDate: Date
  userId: string
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
  professionalExperiences: CandidateProfessionalExperienceModelAttributes[]
  educationalExperiences: CandidateEducationalExperienceModelAttributes[]
  languages: CandidateLanguageModelAttributes[]
  references: CandidateReferenceModelAttributes[]
  achievements: CandidateAchievementModelAttributes[]
}

type CandidateModelWithoutAssociations = Omit<
  CandidateModelAttributes,
  | 'professionalExperiences'
  | 'educationalExperiences'
  | 'languages'
  | 'references'
  | 'achievements'
>

export class CandidateModel extends Model<CandidateModelWithoutAssociations> {
  public static get requiredInclusions(): Includeable[] {
    return [
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
  }
}

CandidateModel.init(
  {
    id: primaryColumn,
    fullName: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    birthDate: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    userId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: UserModel,
        key: 'id',
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
    hooks: {
      beforeCreate(_, options) {
        options.include = CandidateModel.requiredInclusions
      },
      beforeFind(options) {
        options.include = CandidateModel.requiredInclusions
      },
      beforeFindAfterExpandIncludeAll(options) {
        options.include = CandidateModel.requiredInclusions
      },
    },
    tableName: 'candidates',
    modelName: 'Candidate',
  },
)

CandidateModel.hasMany(CandidateProfessionalExperienceModel, {
  foreignKey: 'candidateId',
  as: 'professionalExperiences',
  onDelete: 'CASCADE',
  onUpdate: 'CASCADE',
})
CandidateProfessionalExperienceModel.belongsTo(CandidateModel, {
  foreignKey: 'candidateId',
})

CandidateModel.hasMany(CandidateEducationalExperienceModel, {
  foreignKey: 'candidateId',
  as: 'educationalExperiences',
  onDelete: 'CASCADE',
  onUpdate: 'CASCADE',
})
CandidateEducationalExperienceModel.belongsTo(CandidateModel, {
  foreignKey: 'candidateId',
})

CandidateModel.hasMany(CandidateLanguageModel, {
  foreignKey: 'candidateId',
  as: 'languages',
})
CandidateLanguageModel.belongsTo(CandidateModel, {
  foreignKey: 'candidateId',
})

CandidateModel.hasMany(CandidateAchievementModel, {
  foreignKey: 'candidateId',
  as: 'achievements',
  onDelete: 'CASCADE',
  onUpdate: 'CASCADE',
})
CandidateAchievementModel.belongsTo(CandidateModel, {
  foreignKey: 'candidateId',
})

CandidateModel.hasMany(CandidateReferenceModel, {
  foreignKey: 'candidateId',
  as: 'references',
  onDelete: 'CASCADE',
  onUpdate: 'CASCADE',
})
CandidateReferenceModel.belongsTo(CandidateModel, {
  foreignKey: 'candidateId',
})
