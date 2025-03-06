import { Model, DataTypes } from 'sequelize';

import { primaryColumn } from '../../constants/database-column.def';
import database from '../../config/database';
import { User } from '@talent-hub/shared';
import moment, { Moment } from 'moment';
import Role from '@talent-hub/shared/types/role';

export type UserModelAttr = Omit<User, 'emailConfirmation' | 'passwordReset'> & {
    emailConfirmationToken: string | null;
    emailConfirmationTokenSentAt: Moment | null;
    emailConfirmedAt: Moment | null;
    passwordResetToken: string | null;
    passwordResetExpiresAt: Moment | null;
};

export class UserModel extends Model<UserModelAttr> {}
UserModel.init(
    {
        id: { ...primaryColumn },
        username: { type: DataTypes.STRING, allowNull: false },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                isEmail: true,
            },
        },
        hashedPassword: { type: DataTypes.STRING, allowNull: false },
        profilePictureUrl: { type: DataTypes.STRING, allowNull: true },
        role: { type: DataTypes.ENUM(...Object.values(Role)), allowNull: false },
        emailConfirmationToken: { type: DataTypes.STRING, allowNull: true },
        emailConfirmationTokenSentAt: {
            type: DataTypes.DATE,
            allowNull: true,
            get() {
                return moment(this.getDataValue('emailConfirmationTokenSentAt'));
            },
        },
        emailConfirmedAt: { type: DataTypes.DATE, allowNull: true },
        createdAt: {
            type: DataTypes.DATE,
            allowNull: false,
            get() {
                return moment(this.getDataValue('createdAt'));
            },
        },
        updatedAt: {
            type: DataTypes.DATE,
            allowNull: false,
            get() {
                return moment(this.getDataValue('updatedAt'));
            },
        },
        passwordResetToken: { type: DataTypes.STRING, allowNull: true },
        passwordResetExpiresAt: {
            type: DataTypes.DATE,
            allowNull: true,
            get() {
                return moment(this.getDataValue('passwordResetExpiresAt'));
            },
        },
    },
    {
        sequelize: database,
        underscored: true,
        paranoid: true,
        timestamps: true,
        modelName: 'User',
    },
);
