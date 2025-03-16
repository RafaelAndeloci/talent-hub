import { JobApplicationBusiness } from './job-application-business';
import {
    CreateJobApplicationPayload,
    Entity,
    JobApplication,
    PagedResponse,
    QueryArgs,
    UpdateJobApplicationCoverLetterPayload,
    UpdateJobApplicationStagePayload,
    UpdateJobApplicationStatusPayload,
} from '@talent-hub/shared';
import HTTPStatus from 'http-status';
import { Handler } from '../../types/handler';

export class JobApplicationController {
    public constructor(private readonly jobApplicationBusiness = new JobApplicationBusiness()) {}

    findById: Handler<void, JobApplication, void, Entity> = async (req, res) => {
        const jobApplication = await this.jobApplicationBusiness.findById(req.params.id);
        res.status(HTTPStatus.OK).json(jobApplication).end();
    };

    findAll: Handler<void, PagedResponse<JobApplication>, QueryArgs<JobApplication>, void> = async (
        req,
        res,
    ) => {
        const response = await this.jobApplicationBusiness.findAll({ query: req.query });
        res.status(HTTPStatus.OK).json(response).end();
    };

    create: Handler<CreateJobApplicationPayload, JobApplication, void, void> = async (req, res) => {
        const payload = req.body;
        const context = res.locals;

        const jobApplication = await this.jobApplicationBusiness.create({ payload, context });
        res.status(HTTPStatus.CREATED).json(jobApplication).end();
    };

    updateCoverLetter: Handler<
        UpdateJobApplicationCoverLetterPayload,
        JobApplication,
        void,
        Entity
    > = async (req, res) => {
        const {
            params: { id: jobApplicationId },
            body: payload,
        } = req;

        const jobApplication = await this.jobApplicationBusiness.updateCoverLetter({
            jobApplicationId,
            payload,
        });

        res.status(HTTPStatus.OK).json(jobApplication);
    };

    updateStatus: Handler<UpdateJobApplicationStatusPayload, JobApplication, void, Entity> = async (
        req,
        res,
    ) => {
        const {
            params: { id: jobApplicationId },
            body: payload,
        } = req;
        const { locals: context } = res;

        const jobApplication = await this.jobApplicationBusiness.updateStatus({
            jobApplicationId,
            payload,
            context,
        });

        res.status(HTTPStatus.OK).json(jobApplication).end();
    };

    updateStage: Handler<UpdateJobApplicationStagePayload, JobApplication, void, Entity> = async (
        req,
        res,
    ) => {
        const {
            params: { id: jobApplicationId },
            body: payload,
        } = req;

        const jobApplication = await this.jobApplicationBusiness.updateStage({
            jobApplicationId,
            payload,
        });

        res.status(HTTPStatus.OK).json(jobApplication).end();
    };

    remove: Handler<void, void, void, Entity> = async (req, res) => {
        const {
            params: { id: jobApplicationId },
        } = req;

        await this.jobApplicationBusiness.remove({ jobApplicationId });
        
        res.status(HTTPStatus.NO_CONTENT).end();
    };
}
