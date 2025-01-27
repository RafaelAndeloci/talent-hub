import { DataTypes, Model } from 'sequelize'

import { database, primaryColumn } from '../../config/database/database'
import { JobApplicationStatus } from './types/enums/job-application-status'
import { CandidateModel } from '../candidates/models'
import { JobOpeningModel } from '../job-openings/job-opening-model'
import { JobApplicationStage } from './types/enums/job-application-stage'
import { UserModel } from '../users/user-model'

export interface JobApplicationModelAttr {
  id: string
  candidateId: string
  coverLetter: string | null
  jobOpeningId: string
  // when the application is created by the system, not by the candidate
  isAutoCreated: boolean
  status: JobApplicationStatus
  stage: JobApplicationStage
  appliedBy: string
  rejectedBy: string | null
  rejectionReason: string | null
  createdAt: Date
  updatedAt: Date
}

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
    modelName: 'job_application',
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
)

JobApplicationModel.belongsTo(CandidateModel, {
  foreignKey: 'candidateId',
  as: 'candidate',
})

CandidateModel.hasMany(JobApplicationModel, {
  foreignKey: 'candidateId',
  as: 'jobApplications',
})

JobOpeningModel.hasMany(JobApplicationModel, {
  foreignKey: 'jobOpeningId',
  as: 'applications',
})

JobApplicationModel.belongsTo(JobOpeningModel, {
  foreignKey: 'jobOpeningId',
  as: 'jobOpening',
})
