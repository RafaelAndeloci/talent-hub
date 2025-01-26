/* eslint-disable @typescript-eslint/no-explicit-any */
import { Model, DataTypes } from 'sequelize'

import { Role } from './types/enums/role'
import { database, primaryColumn } from '../../config/database/database'

export interface UserModelAttr {
  id: string
  username: string
  email: string
  hashedPassword: string
  role: string
  profilePictureUrl: string | null
  passwordResetToken: string | null
  passwordResetExpiration: number | null
  createdAt?: Date
  updatedAt?: Date
  deletedAt?: Date | null
}

export class UserModel extends Model<UserModelAttr> {}
UserModel.init(
  {
    id: primaryColumn,
    username: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isEmail: true,
      },
    },
    hashedPassword: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    profilePictureUrl: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    role: {
      type: DataTypes.ENUM,
      values: Object.values(Role),
      allowNull: false,
    },
    passwordResetToken: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    passwordResetExpiration: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    updatedAt: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    deletedAt: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    createdAt: {
      type: DataTypes.DATE,
      allowNull: false,
    },
  },
  {
    sequelize: database,
    underscored: true,
    paranoid: true,
    timestamps: true,
    tableName: 'users',
    modelName: 'User',
  },
)
