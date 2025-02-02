import { DataTypes, Model } from 'sequelize';
import { AchievementType } from '../types/enums/achievement-type';
import database from '../../../config/database';
import { CandidateAchievementModelAttr } from './types/candidate-achievement-model-attr';
import { primaryColumn, urlColumn } from '../../../constants/database-column.def';

export class CandidateAchievementModel extends Model<CandidateAchievementModelAttr> {}

CandidateAchievementModel.init(
    {
        id: primaryColumn,
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        type: {
            type: DataTypes.ENUM(...Object.values(AchievementType)),
            allowNull: false,
        },
        issuer: {
            type: DataTypes.STRING(200),
            allowNull: false,
        },
        workload: {
            type: DataTypes.FLOAT,
            allowNull: true,
        },
        issueDate: {
            type: DataTypes.DATEONLY,
            allowNull: true,
        },
        expirationDate: {
            type: DataTypes.DATEONLY,
            allowNull: true,
        },
        credentialId: {
            type: DataTypes.STRING,
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
        timestamps: false,
        tableName: 'candidate_achievements',
        modelName: 'CandidateAchievement',
    },
);
