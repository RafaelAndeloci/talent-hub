/**
 * @swagger
 * tags:
 *   name: JobOpenings
 *   description: API endpoints for managing job openings
 */

import { Router } from 'express';

import { authorize } from '../../middlewares/authorization-middleware';
import { Resource } from '../../enums/resource';
import { Action } from '../../enums/action';
import {
    CreateJobOpeningSchema,
    FillJobOpeningSchema,
    FindJobOpeningByIdSchema,
    FindJobOpeningsSchema,
    UpdateJobOpeningSchema,
    UpdateJobOpeningStatusSchema,
} from './job-opening-schema';
import { validate } from '../../middlewares/validation-middleware';
import { jobOpeningController } from './job-opening-controller';

export const jobOpeningRouter = Router();

/**
 * @swagger
 * /api/job-openings:
 *   get:
 *     summary: Get all job openings
 *     tags: [JobOpenings]
 *     parameters:
 *       - in: query
 *         name: filter
 *         schema:
 *           type: string
 *         description: Filter job openings
 *     responses:
 *       200:
 *         description: The list of job openings
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/JobOpening'
 */
jobOpeningRouter.get(
    '/',
    authorize({
        resource: Resource.jobOpenings,
        action: Action.readAll,
    }),
    validate(FindJobOpeningsSchema),
    jobOpeningController.findAll,
);

/**
 * @swagger
 * /api/job-openings/{id}:
 *   get:
 *     summary: Get a job opening by ID
 *     tags: [JobOpenings]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The job opening ID
 *     responses:
 *       200:
 *         description: The job opening
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/JobOpening'
 *       404:
 *         description: Job opening not found
 */
jobOpeningRouter.get(
    '/:id',
    authorize({
        resource: Resource.jobOpenings,
        action: Action.readById,
    }),
    validate(FindJobOpeningByIdSchema),
    jobOpeningController.findById,
);

/**
 * @swagger
 * /api/job-openings:
 *   post:
 *     summary: Create a new job opening
 *     tags: [JobOpenings]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CreateJobOpening'
 *     responses:
 *       201:
 *         description: The created job opening
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/JobOpening'
 *       400:
 *         description: Bad request
 */
jobOpeningRouter.post(
    '/',
    authorize({
        resource: Resource.jobOpenings,
        action: Action.create,
    }),
    validate(CreateJobOpeningSchema),
    jobOpeningController.create,
);

/**
 * @swagger
 * /api/job-openings/{id}:
 *   put:
 *     summary: Update a job opening
 *     tags: [JobOpenings]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The job opening ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UpdateJobOpening'
 *     responses:
 *       200:
 *         description: The updated job opening
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/JobOpening'
 *       400:
 *         description: Bad request
 *       404:
 *         description: Job opening not found
 */
jobOpeningRouter.put(
    '/:id',
    authorize({
        resource: Resource.jobOpenings,
        action: Action.update,
    }),
    validate(UpdateJobOpeningSchema),
    jobOpeningController.update,
);

/**
 * @swagger
 * /api/job-openings/{id}/open:
 *   patch:
 *     summary: Open a job opening
 *     tags: [JobOpenings]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The job opening ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UpdateJobOpeningStatus'
 *     responses:
 *       200:
 *         description: The updated job opening
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/JobOpening'
 *       400:
 *         description: Bad request
 *       404:
 *         description: Job opening not found
 */
jobOpeningRouter.patch(
    '/:id/open',
    authorize({
        resource: Resource.jobOpenings,
        action: Action.update,
    }),
    validate(UpdateJobOpeningStatusSchema),
    jobOpeningController.open,
);

/**
 * @swagger
 * /api/job-openings/{id}/close:
 *   patch:
 *     summary: Close a job opening
 *     tags: [JobOpenings]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The job opening ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UpdateJobOpeningStatus'
 *     responses:
 *       200:
 *         description: The updated job opening
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/JobOpening'
 *       400:
 *         description: Bad request
 *       404:
 *         description: Job opening not found
 */
jobOpeningRouter.patch(
    '/:id/close',
    authorize({
        resource: Resource.jobOpenings,
        action: Action.update,
    }),
    validate(UpdateJobOpeningStatusSchema),
    jobOpeningController.close,
);

/**
 * @swagger
 * /api/job-openings/{id}/draft:
 *   patch:
 *     summary: Set a job opening to draft
 *     tags: [JobOpenings]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The job opening ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UpdateJobOpeningStatus'
 *     responses:
 *       200:
 *         description: The updated job opening
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/JobOpening'
 *       400:
 *         description: Bad request
 *       404:
 *         description: Job opening not found
 */
jobOpeningRouter.patch(
    '/:id/draft',
    authorize({
        resource: Resource.jobOpenings,
        action: Action.update,
    }),
    validate(UpdateJobOpeningStatusSchema),
    jobOpeningController.toDraft,
);

/**
 * @swagger
 * /api/job-openings/{id}/fill:
 *   patch:
 *     summary: Fill a job opening
 *     tags: [JobOpenings]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The job opening ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/FillJobOpening'
 *     responses:
 *       200:
 *         description: The updated job opening
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/JobOpening'
 *       400:
 *         description: Bad request
 *       404:
 *         description: Job opening not found
 */
jobOpeningRouter.patch(
    '/:id/fill',
    authorize({
        resource: Resource.jobOpenings,
        action: Action.update,
    }),
    validate(FillJobOpeningSchema),
    jobOpeningController.fill,
);

/**
 * @swagger
 * /api/job-openings/{id}:
 *   delete:
 *     summary: Delete a job opening
 *     tags: [JobOpenings]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The job opening ID
 *     responses:
 *       204:
 *         description: No content
 *       404:
 *         description: Job opening not found
 */
jobOpeningRouter.delete(
    '/:id',
    authorize({
        resource: Resource.jobOpenings,
        action: Action.delete,
    }),
    validate(FindJobOpeningByIdSchema),
    jobOpeningController.remove,
);
