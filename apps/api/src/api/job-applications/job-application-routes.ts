/**
 * @swagger
 * tags:
 *   name: JobApplications
 *   description: API endpoints for managing job applications
 */

import { Router } from 'express'
import { authorize } from '../../middlewares/authorization-middleware'
import { Resource } from '../../shared/enums/resource'
import { Action } from '../../shared/enums/action'
import { validate } from '../../middlewares/validation-middleware'
import {
  CreateJobApplicationSchema,
  DeleteJobApplicationSchema,
  FindAllJobApplicationsSchema,
  FindJobApplicationByIdSchema,
  UpdateJobApplicationSchema,
} from './job-application-schema'
import { jobApplicationController } from './job-application-controller'

export const jobApplicationRouter = Router()

/**
 * @swagger
 * /api/job-applications:
 *   get:
 *     summary: Get all job applications
 *     tags: [JobApplications]
 *     parameters:
 *       - in: query
 *         name: filter
 *         schema:
 *           type: string
 *         description: Filter job applications
 *     responses:
 *       200:
 *         description: The list of job applications
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/JobApplication'
 */
jobApplicationRouter.get(
  '/',
  authorize({
    resource: Resource.jobApplications,
    action: Action.readAll,
  }),
  validate(FindAllJobApplicationsSchema),
  jobApplicationController.findAll,
)

/**
 * @swagger
 * /api/job-applications/{id}:
 *   get:
 *     summary: Get a job application by ID
 *     tags: [JobApplications]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The job application ID
 *     responses:
 *       200:
 *         description: The job application
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/JobApplication'
 *       404:
 *         description: Job application not found
 */
jobApplicationRouter.get(
  '/:id',
  authorize({
    resource: Resource.jobApplications,
    action: Action.readById,
  }),
  validate(FindJobApplicationByIdSchema),
  jobApplicationController.findById,
)

/**
 * @swagger
 * /api/job-applications:
 *   post:
 *     summary: Create a new job application
 *     tags: [JobApplications]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CreateJobApplication'
 *     responses:
 *       201:
 *         description: The created job application
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/JobApplication'
 *       400:
 *         description: Bad request
 */
jobApplicationRouter.post(
  '/',
  authorize({
    resource: Resource.jobApplications,
    action: Action.create,
  }),
  validate(CreateJobApplicationSchema),
  jobApplicationController.create,
)

/**
 * @swagger
 * /api/job-applications/{id}:
 *   put:
 *     summary: Update a job application
 *     tags: [JobApplications]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The job application ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UpdateJobApplication'
 *     responses:
 *       200:
 *         description: The updated job application
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/JobApplication'
 *       400:
 *         description: Bad request
 *       404:
 *         description: Job application not found
 */
jobApplicationRouter.put(
  '/:id',
  authorize({
    resource: Resource.jobApplications,
    action: Action.update,
  }),
  validate(UpdateJobApplicationSchema),
  jobApplicationController.update,
)

/**
 * @swagger
 * /api/job-applications/{id}:
 *   delete:
 *     summary: Delete a job application
 *     tags: [JobApplications]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The job application ID
 *     responses:
 *       204:
 *         description: No content
 *       404:
 *         description: Job application not found
 */
jobApplicationRouter.delete(
  '/:id',
  authorize({
    resource: Resource.jobApplications,
    action: Action.delete,
  }),
  validate(DeleteJobApplicationSchema),
  jobApplicationController.remove,
)
