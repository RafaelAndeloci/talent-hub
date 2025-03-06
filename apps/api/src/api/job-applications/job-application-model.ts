import { DataTypes, Model, ModelStatic } from 'sequelize';

import database from '../../config/database';
import { primaryColumn } from '../../constants/database-column.def';
import { JobApplicationModelAttr } from '../../types/job-application-model-attr';
import { JobApplicationStatus, JobApplicationStage } from '@talent-hub/shared';

export class JobApplicationModel extends Model<JobApplicationModelAttr> {
    static associate({
        User,
        JobOpening,
    }: {
        User: ModelStatic<Model>;
        JobOpening: ModelStatic<Model>;
    }) {
        JobApplicationModel.belongsTo(User, { foreignKey: 'appliedBy', as: 'appliedByUser' });
        User.hasMany(JobApplicationModel, { foreignKey: 'appliedBy', as: 'applications' });

        JobApplicationModel.belongsTo(User, { foreignKey: 'rejectedBy', as: 'rejectedByUser' });
        User.hasMany(JobApplicationModel, { foreignKey: 'rejectedBy', as: 'rejections' });

        JobApplicationModel.belongsTo(JobOpening, { foreignKey: 'jobOpeningId', as: 'jobOpening' });
        JobOpening.hasMany(JobApplicationModel, { foreignKey: 'jobOpeningId', as: 'applications' });
    }
}

JobApplicationModel.init(
    {
        id: { ...primaryColumn },
        candidateId: { type: DataTypes.UUID, allowNull: false },
        coverLetter: { type: DataTypes.TEXT, allowNull: true },
        appliedBy: { type: DataTypes.UUID, allowNull: true },
        jobOpeningId: { type: DataTypes.UUID, allowNull: false },
        isAutoCreated: { type: DataTypes.BOOLEAN, allowNull: false },
        status: {
            type: DataTypes.ENUM(...Object.values(JobApplicationStatus)),
            allowNull: false,
        },
        createdAt: { type: DataTypes.DATE, allowNull: false },
        updatedAt: { type: DataTypes.DATE, allowNull: false },
        stage: {
            type: DataTypes.ENUM(...Object.values(JobApplicationStage)),
            allowNull: false,
        },
        rejectedBy: { type: DataTypes.UUID, allowNull: true },
        rejectionReason: { type: DataTypes.STRING, allowNull: true },
    },
    {
        sequelize: database,
        modelName: 'JobApplication',
        indexes: [
            {
                fields: ['candidate_id', 'job_opening_id'],
                unique: true,
                where: { status: JobApplicationStatus.applied },
            },
        ],
    },
);
