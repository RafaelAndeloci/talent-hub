import { JobApplicationStatus } from "@prisma/client";

type JobApplicationUpdatePayload = {
  jobApplicationId: string;
  status?: JobApplicationStatus;
  interviewNotes?: string[];
  rejectionReason?: string;
  userId: string;
};

export default JobApplicationUpdatePayload;
