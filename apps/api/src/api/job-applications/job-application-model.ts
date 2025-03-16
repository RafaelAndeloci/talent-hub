import { DataTypes, Model, ModelStatic } from 'sequelize';
import database from '../../config/database';
import { primaryColumn } from '../../constants/database-column.def';
import { JobApplication } from '@talent-hub/shared';
import { Moment } from 'moment';
import { JobApplicationStage } from '@talent-hub/shared/types/job-application-stage';
import { JobApplicationStatus } from '@talent-hub/shared/types/job-application-status';

type JobApplicationModelAttrInternal = Omit<
    JobApplication,
    'candidate' | 'jobOpening' | 'rejection'
> & {
    candidateId: string;
    jobOpeningId: string;
    rejectedBy: string | null;
    rejectionReason: string | null;
    rejectionAt: Moment | null;
};

export type JobApplicationModelAttr = JobApplicationModelAttrInternal & {
    candidateName: string | null;
    jobOpeningTitle: string | null;
};

export class JobApplicationModel extends Model<JobApplicationModelAttrInternal> {
    static associate({
        User,
        JobOpening,
        Candidate,
    }: {
        User: ModelStatic<Model>;
        JobOpening: ModelStatic<Model>;
        Candidate: ModelStatic<Model>;
    }) {
        JobApplicationModel.belongsTo(User, { foreignKey: 'rejectedBy', as: 'rejectedByUser' });
        User.hasMany(JobApplicationModel, { foreignKey: 'rejectedBy', as: 'rejections' });

        JobApplicationModel.belongsTo(User, { foreignKey: 'createdBy', as: 'createdByUser' });
        User.hasMany(JobApplicationModel, { foreignKey: 'createdBy', as: 'applications' });

        JobApplicationModel.belongsTo(JobOpening, { foreignKey: 'jobOpeningId', as: 'jobOpening' });
        JobOpening.hasMany(JobApplicationModel, { foreignKey: 'jobOpeningId', as: 'applications' });

        JobApplicationModel.belongsTo(Candidate, { foreignKey: 'candidateId', as: 'candidate' });
        Candidate.hasMany(JobApplicationModel, { foreignKey: 'candidateId', as: 'applications' });

        JobApplicationModel.beforeFind((options) => {
            options.include = [
                {
                    model: Candidate,
                    as: 'candidate',
                    attributes: {
                        include: ['id', 'name'],
                    },
                },
                {
                    model: JobOpening,
                    as: 'jobOpening',
                    attributes: {
                        include: ['id', 'title'],
                    },
                },
            ];
        });
    }
}

JobApplicationModel.init(
    {
        id: { ...primaryColumn },
        candidateId: { type: DataTypes.UUID, allowNull: false },
        coverLetter: { type: DataTypes.TEXT, allowNull: true },
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
        rejectionAt: { type: DataTypes.DATE, allowNull: true },
        createdBy: { type: DataTypes.UUID, allowNull: false },
    },
    {
        sequelize: database,
        modelName: 'JobApplication',
        //TODO: verificar critérios de unicidade
        indexes: [
            // {
            //     fields: ['candidate_id', 'job_opening_id'],
            //     unique: true,
            //     where: { status: JobApplicationStatus.waiting },
            // },
        ],
    },
);
