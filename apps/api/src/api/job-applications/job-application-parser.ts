import * as uuid from 'uuid';

import { Role } from '../users/types/enums/role';
import { JobApplicationStage } from './types/enums/job-application-stage';
import { JobApplicationStatus } from './types/enums/job-application-status';
import { JobApplicationParser } from './types/job-application-parser';

export const jobApplicationParser: JobApplicationParser = {
    newInstance: ({ payload, user }) => ({
        id: uuid.v4(),
        candidateId: payload.candidateId,
        coverLetter: payload.coverLetter,
        jobOpeningId: payload.jobOpeningId,
        isAutoCreated: user.role === Role.sysAdmin,
        status: JobApplicationStatus.applied,
        stage: JobApplicationStage.screening,
        appliedBy: user.id,
        rejection: null,
        createdAt: new Date(),
        updatedAt: new Date(),
    }),

    fromDatabase: (model) => ({
        id: model.id,
        candidateId: model.candidateId,
        coverLetter: model.coverLetter,
        jobOpeningId: model.jobOpeningId,
        isAutoCreated: model.isAutoCreated,
        stage: model.stage,
        status: model.status,
        rejection:
            model.rejectedBy && model.rejectionReason
                ? {
                    rejectedBy: model.rejectedBy,
                    reason: model.rejectionReason,
                }
                : null,
        appliedBy: model.appliedBy,
        createdAt: model.createdAt,
        updatedAt: model.updatedAt,
    }),

    toDatabase: (entity) => ({
        id: entity.id,
        candidateId: entity.candidateId,
        coverLetter: entity.coverLetter,
        jobOpeningId: entity.jobOpeningId,
        stage: entity.stage,
        status: entity.status,
        createdAt: entity.createdAt,
        updatedAt: entity.updatedAt,
        rejectedBy: entity.rejection?.rejectedBy ?? null,
        rejectionReason: entity.rejection?.reason ?? null,
        appliedBy: entity.appliedBy,
        isAutoCreated: entity.isAutoCreated,
    }),
};
