import {
    AuthContext,
    JobOpeningDto,
    FindAllJobOpeningsQuery,
    FindAllJobOpeningsDto,
    CreateJobOpeningPayload,
    UpdateJobOpeningPayload,
    FillJobApplicationPayload,
    JobOpening,
} from '@talent-hub/shared/types';

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
