import { DataTypes, Model } from 'sequelize'
import {
  database,
  primaryColumn,
  urlColumn,
} from '../../config/database/database'
import { isValidCnpj } from '../../shared/utils/document-validator'
import { ApiError } from '../../shared/types/api-error'

/* eslint-disable @typescript-eslint/no-explicit-any */
export interface CompanyModelAttr {
  id: string
  tradeName: string
  legalName: string
  cnpj: string
  employeesQuantity: number
  foundationYear: number
  linkedin: string | null
  github: string | null
  instagram: string | null
  facebook: string | null
  twitter: string | null
  youtube: string | null
  medium: string | null
  website: string | null
  about: string | null
  contactPhone: string
  contactEmail: string
  address: any
  bannerUrl: string | null
  logoUrl: string | null
  mission: string | null
  vision: string | null
  values: string[] | null
  industry: string
}

export class CompanyModel extends Model<CompanyModelAttr> {}
CompanyModel.init(
  {
    id: primaryColumn,
    tradeName: { type: DataTypes.STRING(150), allowNull: false },
    legalName: { type: DataTypes.STRING(200), allowNull: false },
    cnpj: {
      type: DataTypes.STRING(14),
      allowNull: false,
      validate: {
        isCnpj: (value: string) => {
          if (!isValidCnpj(value)) {
            ApiError.throwBadRequest('Invalid CNPJ')
          }
        },
      },
    },
    employeesQuantity: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: { min: 1 },
    },
    foundationYear: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: { min: 1900 },
    },
    linkedin: urlColumn,
    github: urlColumn,
    instagram: urlColumn,
    facebook: urlColumn,
    twitter: urlColumn,
    youtube: urlColumn,
    medium: urlColumn,
    website: urlColumn,
    about: { type: DataTypes.TEXT, allowNull: true },
    contactPhone: {
      type: DataTypes.STRING(11),
      allowNull: false,
      validate: {
        is: { args: /^\d{11}$/, msg: 'Invalid phone number' },
      },
    },
    contactEmail: {
      type: DataTypes.STRING(100),
      allowNull: false,
      validate: { isEmail: true },
    },
    address: { type: DataTypes.JSONB, allowNull: false },
    bannerUrl: urlColumn,
    logoUrl: urlColumn,
    mission: { type: DataTypes.TEXT, allowNull: true },
    vision: { type: DataTypes.TEXT, allowNull: true },
    values: { type: DataTypes.ARRAY(DataTypes.STRING), allowNull: true },
    industry: { type: DataTypes.STRING(100), allowNull: false },
  },
  { sequelize: database, modelName: 'Company', tableName: 'companies' },
)
