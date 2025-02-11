import { Model, DataTypes } from 'sequelize';

import { primaryColumn } from '../../constants/database-column.def';
import database from '../../config/database';
import { UserModelAttr } from '../../types/user-model-attr';
import { Role } from '@talent-hub/shared/types';


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
        emailConfirmationToken: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        emailConfirmationTokenSentAt: {
            type: DataTypes.DATE,
            allowNull: true,
        },
        emailConfirmedAt: {
            type: DataTypes.DATE,
            allowNull: true,
        },
        createdAt: {
            type: DataTypes.DATE,
            allowNull: false,
        },
        updatedAt: {
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
);
