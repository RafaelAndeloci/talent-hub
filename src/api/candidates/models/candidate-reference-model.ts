import { DataTypes, Model } from 'sequelize'
import { database, primaryColumn } from '../../../config/database/database'

export interface CandidateReferenceModelAttr {
  id?: string
  name: string
  position: string
  company: string | null
  email: string
  phone: string
  relationship: string
}

export class CandidateReferenceModel extends Model<CandidateReferenceModelAttr> {}

CandidateReferenceModel.init(
  {
    id: primaryColumn,
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
