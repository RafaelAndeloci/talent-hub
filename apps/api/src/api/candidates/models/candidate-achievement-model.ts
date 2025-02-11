import { DataTypes, Model } from 'sequelize';
import database from '../../../config/database';
import { primaryColumn } from '../../../constants/database-column.def';
import { AchievementType } from '@talent-hub/shared/types';
import { CandidateAchievementModelAttr } from '../../../types/candidate-achievement-model-attr';

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
        credentialUrl: {
            type: DataTypes.STRING,
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
        timestamps: false,
        tableName: 'candidate_achievements',
        modelName: 'CandidateAchievement',
    },
);
