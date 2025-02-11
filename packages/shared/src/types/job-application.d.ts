import { Id } from "./id";
import { JobApplicationStage } from "./job-application-stage";
import { JobApplicationStatus } from "./job-application-status";

export type Rejection = {
    rejectedBy: string;
    reason: string;
};

export interface JobApplication extends Id {
    candidateId: string;
    coverLetter: string | null;
    jobOpeningId: string;
    isAutoCreated: boolean;
    status: JobApplicationStatus;
    stage: JobApplicationStage;
    appliedBy: string;
    rejection: Rejection | null;
    createdAt: Date;
    updatedAt: Date;
}
