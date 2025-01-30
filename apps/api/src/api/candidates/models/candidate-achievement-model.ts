import { DataTypes, Model } from 'sequelize';
import { AchievementType } from '../types/enums/achievement-type';
import { database } from '../../../config/database';
import { CandidateAchievementModelAttr } from './types/candidate-achievement-model-attr';
import { primaryColumn, urlColumn } from '../../../constants/database-column.def';

export class CandidateAchievementModel extends Model<CandidateAchievementModelAttr> {}

CandidateAchievementModel.init(
    {
        id: primaryColumn,
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
);
