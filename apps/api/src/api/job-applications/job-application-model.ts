import { DataTypes, Model } from 'sequelize';

import database from '../../config/database';
import { JobApplicationStatus } from './types/enums/job-application-status';
import { CandidateModel } from '../candidates/models';
import { JobOpeningModel } from '../job-openings/job-opening-model';
import { JobApplicationStage } from './types/enums/job-application-stage';
import { UserModel } from '../users/user-model';
import { primaryColumn } from '../../constants/database-column.def';
import { JobApplicationModelAttr } from './types/job-application-model-attr';

export class JobApplicationModel extends Model<JobApplicationModelAttr> {}
JobApplicationModel.init(
    {
        id: primaryColumn,
        candidateId: {
            type: DataTypes.UUID,
            allowNull: false,
            references: {
                model: CandidateModel,
                key: 'id',
            },
        },
        coverLetter: {
            type: DataTypes.TEXT,
            allowNull: true,
        },
        appliedBy: {
            type: DataTypes.UUID,
            allowNull: true,
            references: {
                model: UserModel,
                key: 'id',
            },
        },
        jobOpeningId: {
            type: DataTypes.UUID,
            allowNull: false,
            references: {
                model: JobOpeningModel,
                key: 'id',
            },
        },
        isAutoCreated: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
        },
        status: {
            type: DataTypes.ENUM(...Object.values(JobApplicationStatus)),
            allowNull: false,
        },
        createdAt: {
            type: DataTypes.DATE,
            allowNull: false,
        },
        updatedAt: {
            type: DataTypes.DATE,
            allowNull: false,
        },
        stage: {
            type: DataTypes.ENUM(...Object.values(JobApplicationStage)),
            allowNull: false,
        },
        rejectedBy: {
            type: DataTypes.UUID,
            allowNull: true,
            references: {
                model: UserModel,
                key: 'id',
            },
        },
        rejectionReason: {
            type: DataTypes.STRING,
            allowNull: true,
        },
    },
    {
        sequelize: database,
        modelName: 'JobApplication',
        tableName: 'job_applications',
        underscored: true,
        timestamps: true,
        indexes: [
            {
                fields: ['candidate_id', 'job_opening_id'],
                unique: true,
                where: {
                    status: JobApplicationStatus.applied,
                },
            },
        ],
    },
);
