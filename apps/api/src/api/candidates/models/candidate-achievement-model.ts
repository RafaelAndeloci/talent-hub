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
        workload: {
            type: DataTypes.FLOAT,
            allowNull: true,
        },
        issueDate: {
            type: DataTypes.DATEONLY,
            allowNull: false,
        },
        expirationDate: {
            type: DataTypes.DATEONLY,
            allowNull: true,
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
