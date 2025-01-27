/**
 * @swagger
 * tags:
 *   name: Candidates
 *   description: API endpoints for managing candidates
 */

import { Router } from 'express'

import {
  CreateCandidateSchema,
  DeleteCandidateSchema,
  FindAllCandidatesSchema,
  FindCandidateByIdSchema,
  UpdateCandidateCvSchema,
  UpdateCandidateSchema,
} from './candidate-schema'
import { validate } from '../../middlewares/validation-middleware'
import { candidateController } from './candidate-controller'
import { authorize } from '../../middlewares/authorization-middleware'
import { Resource } from '../../shared/enums/resource'
import { Action } from '../../shared/enums/action'
import { singleFileUpload } from '../../middlewares/file-upload-middleware'

export const candidatesRouter = Router()

/**
 * @swagger
 * /api/candidates:
 *   post:
 *     summary: Create a new candidate
 *     tags: [Candidates]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CreateCandidateSchema'
 *     responses:
 *       201:
 *         description: Candidate created successfully
 *       400:
 *         description: Invalid input
 */
candidatesRouter.post(
  '/',
  authorize({ resource: Resource.candidates, action: Action.create }),
  validate(CreateCandidateSchema),
  candidateController.create,
)

/**
 * @swagger
 * /api/candidates/{id}:
 *   put:
 *     summary: Update a candidate
 *     tags: [Candidates]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: Candidate ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UpdateCandidateSchema'
 *     responses:
 *       200:
 *         description: Candidate updated successfully
 *       400:
 *         description: Invalid input
 *       404:
 *         description: Candidate not found
 */
candidatesRouter.put(
  '/:id',
  authorize({ resource: Resource.candidates, action: Action.update }),
  validate(UpdateCandidateSchema),
  candidateController.update,
)

/**
 * @swagger
 * /api/candidates/{id}:
 *   delete:
 *     summary: Remove a candidate
 *     tags: [Candidates]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: Candidate ID
 *     responses:
 *       200:
 *         description: Candidate removed successfully
 *       404:
 *         description: Candidate not found
 */
candidatesRouter.delete(
  '/:id',
  authorize({ resource: Resource.candidates, action: Action.delete }),
  validate(DeleteCandidateSchema),
  candidateController.remove,
)

/**
 * @swagger
 * /api/candidates/{id}:
 *   get:
 *     summary: Get a candidate by ID
 *     tags: [Candidates]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: Candidate ID
 *     responses:
 *       200:
 *         description: Candidate retrieved successfully
 *       404:
 *         description: Candidate not found
 */
candidatesRouter.get(
  '/:id',
  authorize({ resource: Resource.candidates, action: Action.readById }),
  validate(FindCandidateByIdSchema),
  candidateController.findById,
)

/**
 * @swagger
 * /api/candidates:
 *   get:
 *     summary: Get all candidates
 *     tags: [Candidates]
 *     responses:
 *       200:
 *         description: List of candidates retrieved successfully
 */
candidatesRouter.get(
  '/',
  authorize({ resource: Resource.candidates, action: Action.readAll }),
  validate(FindAllCandidatesSchema),
  candidateController.findAll,
)

/**
 * @swagger
 * /api/candidates/{id}/cv:
 *   put:
 *     summary: Update candidate CV
 *     tags: [Candidates]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: Candidate ID
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               file:
 *                 type: string
 *                 format: binary
 *     responses:
 *       200:
 *         description: Candidate CV updated successfully
 *       400:
 *         description: Invalid input
 */
candidatesRouter.put(
  '/:id/cv',
  authorize({
    resource: Resource.candidates,
    action: Action.updateCandidateCv,
  }),
  singleFileUpload,
  validate(UpdateCandidateCvSchema),
  candidateController.updateCv,
)

/**
 * @swagger
 * /api/candidates/{id}/banner:
 *   put:
 *     summary: Update candidate banner
 *     tags: [Candidates]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: Candidate ID
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               file:
 *                 type: string
 *                 format: binary
 *     responses:
 *       200:
 *         description: Candidate banner updated successfully
 *       400:
 *         description: Invalid input
 */
candidatesRouter.put(
  '/:id/banner',
  authorize({
    resource: Resource.candidates,
    action: Action.updateCandidateBanner,
  }),
  singleFileUpload,
  validate(UpdateCandidateSchema),
  candidateController.updateBanner,
)
