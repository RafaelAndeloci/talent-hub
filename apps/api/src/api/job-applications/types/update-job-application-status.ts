import { JobApplicationStatus } from "./enums/job-application-status";

export type UpdateJobApplicationStatusPayload = {
    status: JobApplicationStatus;
    rejectionReason?: string;
};