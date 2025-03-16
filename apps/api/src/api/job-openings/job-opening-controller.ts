// import HTTPStatus from 'http-status';

// import { jobOpeningBusiness } from './job-opening-business';
// import { JobOpeningController } from '../../types/job-opening-controller';

// export const jobOpeningController: JobOpeningController = {
//     findById: async ({ params: { id: jobOpeningId } }, res) => {
//         const jobOpening = await jobOpeningBusiness.findById({
//             jobOpeningId,
//             context: res.locals,
//         });
//         res.status(HTTPStatus.OK).json(jobOpening);
//     },

//     findAll: async ({ query }, res) => {
//         const jobOpenings = await jobOpeningBusiness.findAll({
//             query,
//             context: res.locals,
//         });
//         res.status(HTTPStatus.OK).json(jobOpenings);
//     },

//     create: async ({ body: payload }, res) => {
//         const jobOpening = await jobOpeningBusiness.create({
//             payload,
//             context: res.locals,
//         });
//         res.status(HTTPStatus.CREATED).json(jobOpening);
//     },

//     update: async ({ params: { id: jobOpeningId }, body: payload }, res) => {
//         const jobOpening = await jobOpeningBusiness.update({
//             jobOpeningId,
//             payload,
//             context: res.locals,
//         });
//         res.status(HTTPStatus.OK).json(jobOpening);
//     },

//     remove: async ({ params: { id: jobOpeningId } }, res) => {
//         await jobOpeningBusiness.remove({ jobOpeningId, context: res.locals });
//         res.status(HTTPStatus.NO_CONTENT).send();
//     },

//     open: async ({ params: { id: jobOpeningId } }, res) => {
//         const jobOpening = await jobOpeningBusiness.open({
//             jobOpeningId,
//             context: res.locals,
//         });
//         res.status(HTTPStatus.OK).json(jobOpening);
//     },

//     close: async ({ params: { id: jobOpeningId } }, res) => {
//         const jobOpening = await jobOpeningBusiness.close({
//             jobOpeningId,
//             context: res.locals,
//         });
//         res.status(HTTPStatus.OK).json(jobOpening);
//     },

//     toDraft: async ({ params: { id: jobOpeningId } }, res) => {
//         const jobOpening = await jobOpeningBusiness.toDraft({
//             jobOpeningId,
//             context: res.locals,
//         });
//         res.status(HTTPStatus.OK).json(jobOpening);
//     },

//     fill: async ({ params: { id: jobOpeningId }, body: payload }, res) => {
//         const jobOpening = await jobOpeningBusiness.fill({
//             jobOpeningId,
//             payload,
//             context: res.locals,
//         });
//         res.status(HTTPStatus.OK).json(jobOpening);
//     },
// };

import {
    Entity,
    FillJobOpeningPayload,
    JobOpening,
    JobOpeningPayload,
    JobOpeningUpdateStatusAction,
    PagedResponse,
    QueryArgs,
} from '@talent-hub/shared';
import { Handler } from '../../types/handler';
import { JobOpeningBusiness } from './job-opening-business';
import HTTPStatus from 'http-status';
import ApiError from '../../utils/api-error';

export class JobOpeningController {
    public constructor(private readonly jobOpeningBusiness = new JobOpeningBusiness()) {}

    public findById: Handler<{}, JobOpening, void, Entity> = async (
        { params: { id: jobOpeningId } },
        res,
    ) => {
        const jobOpening = await this.jobOpeningBusiness.findById({
            jobOpeningId,
        });
        res.status(HTTPStatus.OK).json(jobOpening);
    };

    public findAll: Handler<{}, PagedResponse<JobOpening>, QueryArgs<JobOpening>, Entity> = async (
        { query },
        res,
    ) => {
        const jobOpenings = await this.jobOpeningBusiness.findAll({
            query,
        });
        res.status(HTTPStatus.OK).json(jobOpenings);
    };

    public create: Handler<JobOpeningPayload, JobOpening, {}, Entity> = async (
        { body: payload },
        res,
    ) => {
        const jobOpening = await this.jobOpeningBusiness.create({
            payload,
        });
        res.status(HTTPStatus.CREATED).json(jobOpening);
    };

    public update: Handler<JobOpeningPayload, JobOpening, {}, Entity> = async (
        { params: { id: jobOpeningId }, body: payload },
        res,
    ) => {
        const jobOpening = await this.jobOpeningBusiness.update({
            jobOpeningId,
            payload,
        });
        res.status(HTTPStatus.OK).json(jobOpening);
    };

    public updateStatus: Handler<
        FillJobOpeningPayload | null,
        JobOpening,
        {},
        Entity & { action: JobOpeningUpdateStatusAction }
    > = async ({ params: { id: jobOpeningId, action }, body: payload }, res) => {
        let jobOpening: JobOpening;

        switch (action) {
            case JobOpeningUpdateStatusAction.Fill:
                jobOpening = await this.jobOpeningBusiness.fill({
                    jobOpeningId,
                    payload: payload as FillJobOpeningPayload,
                });
                break;
            case JobOpeningUpdateStatusAction.Open:
                jobOpening = await this.jobOpeningBusiness.open({ jobOpeningId });
                break;
            case JobOpeningUpdateStatusAction.Close:
                jobOpening = await this.jobOpeningBusiness.close({ jobOpeningId });
                break;
            case JobOpeningUpdateStatusAction.ToDraft:
                jobOpening = await this.jobOpeningBusiness.toDraft({ jobOpeningId });
                break;
            default:
                ApiError.throwBadRequest('Invalid action');
        }

        res.status(HTTPStatus.OK).json(jobOpening).end();
    };

    public remove: Handler<{}, void, void, Entity> = async (
        { params: { id: jobOpeningId } },
        res,
    ) => {
        await this.jobOpeningBusiness.remove({ jobOpeningId });
        res.status(HTTPStatus.NO_CONTENT).send();
    };
}
