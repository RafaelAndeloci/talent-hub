import {
    CreateJobApplicationPayload,
    DbParser,
    JobApplication,
    JobApplicationStage,
    JobApplicationStatus,
    newUUID,
    Role,
    UserDto,
} from '@talent-hub/shared';
import { JobApplicationModelAttr } from './job-application-model';
import moment from 'moment';

type JobApplicationParser = DbParser<JobApplication, JobApplicationModelAttr> & {
    newInstance: (args: { payload: CreateJobApplicationPayload; user: UserDto }) => JobApplication;
};

export const jobApplicationParser: JobApplicationParser = {
    newInstance: ({ payload: { candidate, jobOpening, ...rest }, user }) => ({
        id: newUUID(),
        ...rest,
        candidate: {
            id: candidate.id,
            name: null,
        },
        jobOpening: {
            id: jobOpening.id,
            title: null,
        },
        rejection: null,
        stage: JobApplicationStage.applied,
        status: JobApplicationStatus.waiting,
        createdAt: moment(),
        updatedAt: moment(),
        isAutoCreated: user.role === Role.SysAdmin,
        createdBy: user.id,
    }),

    toDb: (data) => ({
        ...data,
        rejectedBy: data.rejection?.by ?? null,
        rejectionReason: data.rejection?.reason ?? null,
        rejectionAt: data.rejection?.at ?? null,
        candidateId: data.candidate.id,
        jobOpeningId: data.jobOpening.id,
        candidateName: null,
        jobOpeningTitle: null,
    }),

    fromDb: ({
        candidateId,
        candidateName,
        jobOpeningId,
        jobOpeningTitle,
        rejectedBy,
        rejectionAt,
        rejectionReason,
        ...rest
    }) => ({
        ...rest,
        candidate: { id: candidateId, name: candidateName },
        jobOpening: { id: jobOpeningId, title: jobOpeningTitle },
        rejection:
            rejectedBy && rejectionAt && rejectionReason
                ? {
                      by: rejectedBy,
                      at: rejectionAt,
                      reason: rejectionReason,
                  }
                : null,
    }),
};
