import { Model, DataTypes } from 'sequelize';

import { Role } from './types/enums/role';
import { primaryColumn } from '../../constants/database-column.def';
import database from '../../config/database';

export interface UserModelAttr {
    id: string;
    username: string;
    email: string;
    hashedPassword: string;
    role: Role;
    profilePictureUrl: string | null;
    passwordResetToken: string | null;
    passwordResetExpiration: number | null;
    emailConfirmationToken: string | null;
    createdAt: Date;
    updatedAt: Date;
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
        emailConfirmationToken: {
            type: DataTypes.STRING,
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
