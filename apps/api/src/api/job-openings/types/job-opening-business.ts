import { JobOpeningDto } from './job-opening-dto';
import { JobOpening } from './job-opening';
import { AuthContext } from '../../users/types/auth-context';
import { UpdateJobOpeningPayload } from './update-job-opening-payload';
import { CreateJobOpeningPayload } from './create-job-opening-payload';
import { FindAllJobOpeningsQuery } from './find-all-job-openings-query';
import { FindAllJobOpeningsDto } from './find-all-job-openings-dto';
import { FillJobApplicationPayload } from './fill-job-application-payload';

export type JobOpeningBusiness = {
    findById(args: { jobOpeningId: string; context: AuthContext }): Promise<JobOpeningDto>;

    findAll(args: {
        query: FindAllJobOpeningsQuery;
        context: AuthContext;
    }): Promise<FindAllJobOpeningsDto>;

    create(args: {
        payload: CreateJobOpeningPayload;
        context: AuthContext;
    }): Promise<JobOpeningDto>;

    update(args: {
        jobOpeningId: string;
        payload: UpdateJobOpeningPayload;
        context: AuthContext;
    }): Promise<JobOpeningDto>;

    close(args: { jobOpeningId: string; context: AuthContext }): Promise<JobOpeningDto>;

    open(args: { jobOpeningId: string; context: AuthContext }): Promise<JobOpeningDto>;

    fill(args: {
        jobOpeningId: string;
        payload: FillJobApplicationPayload;
        context: AuthContext;
    }): Promise<JobOpeningDto>;

    toDraft(args: { jobOpeningId: string; context: AuthContext }): Promise<JobOpeningDto>;

    remove(args: { jobOpeningId: string; context: AuthContext }): Promise<void>;

    validateForApplication(args: {
        jobOpeningId: string;
        context: AuthContext;
    }): Promise<JobOpening | null>;

    canBeClosed(args: { jobOpening: JobOpening; context: AuthContext }): boolean;
};
