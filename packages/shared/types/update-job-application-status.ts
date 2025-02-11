import { JobApplicationStatus } from "./job-application-status";

export type UpdateJobApplicationStatusPayload = {
    status: JobApplicationStatus;
    rejectionReason?: string;
};