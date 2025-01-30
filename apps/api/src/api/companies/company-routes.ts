/**
 * @swagger
 * tags:
 *   name: Companies
 *   description: API endpoints for managing companies
 */

/* eslint-disable @typescript-eslint/no-explicit-any */
import { Router } from 'express';
import { authorize } from '../../middlewares/authorization-middleware';
import { Resource } from '../../enums/resource';
import { Action } from '../../enums/action';
import {
    CreateCompanySchema,
    DeleteCompanySchema,
    FindAllCompaniesSchema,
    FindCompanyByIdSchema,
    UpdateCompanySchema,
} from './company-schema';
import { validate } from '../../middlewares/validation-middleware';
import { companyController } from './company-controller';

export const companyRouter = Router();

/**
 * @swagger
 * /api/companies:
 *   get:
 *     summary: Get all companies
 *     tags: [Companies]
 *     parameters:
 *       - in: query
 *         name: query
 *         schema:
 *           $ref: '#/components/schemas/FindAllCompanies'
 *     responses:
 *       200:
 *         description: List of companies
 */
companyRouter.get(
    '',
    authorize({ resource: Resource.companies, action: Action.readAll }),
    validate(FindAllCompaniesSchema),
    companyController.findAll as any,
);

/**
 * @swagger
 * /api/companies/{id}:
 *   get:
 *     summary: Get a company by ID
 *     tags: [Companies]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *     responses:
 *       200:
 *         description: Company details
 */
companyRouter.get(
    '/:id',
    authorize({ resource: Resource.companies, action: Action.readById }),
    validate(FindCompanyByIdSchema),
    companyController.findById as any,
);

/**
 * @swagger
 * /api/companies:
 *   post:
 *     summary: Create a new company
 *     tags: [Companies]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CreateCompany'
 *     responses:
 *       201:
 *         description: Company created
 */
companyRouter.post(
    '',
    authorize({ resource: Resource.companies, action: Action.create }),
    validate(CreateCompanySchema),
    companyController.create as any,
);

/**
 * @swagger
 * /api/companies/{id}:
 *   put:
 *     summary: Update a company
 *     tags: [Companies]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UpdateCompany'
 *     responses:
 *       200:
 *         description: Company updated
 */
companyRouter.put(
    '/:id',
    authorize({ resource: Resource.companies, action: Action.update }),
    validate(UpdateCompanySchema),
    companyController.update as any,
);

/**
 * @swagger
 * /api/companies/{id}:
 *   delete:
 *     summary: Delete a company
 *     tags: [Companies]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *     responses:
 *       204:
 *         description: Company deleted
 */
companyRouter.delete(
    '/:id',
    authorize({ resource: Resource.companies, action: Action.delete }),
    validate(DeleteCompanySchema),
    companyController.remove as any,
);
