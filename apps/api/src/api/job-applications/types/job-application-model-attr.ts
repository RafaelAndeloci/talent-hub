import { JobApplicationStage } from "./enums/job-application-stage";
import { JobApplicationStatus } from "./enums/job-application-status";

export interface JobApplicationModelAttr {
    id: string;
    candidateId: string;
    coverLetter: string | null;
    jobOpeningId: string;
    /**
     * true if application  is created by system
     */
    isAutoCreated: boolean;
    status: JobApplicationStatus;
    stage: JobApplicationStage;
    appliedBy: string;
    rejectedBy: string | null;
    rejectionReason: string | null;
    createdAt: Date;
    updatedAt: Date;
}
