import swaggerJSDocs from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
import { Express } from 'express';

import { config } from '../config/environment';
import { Benefit } from '../api/candidates/types/enums/benefit';
import { ContractType } from '../api/candidates/types/enums/contract-type';
import { EmploymentType } from '../api/candidates/types/enums/employment-type';
import { AcademicDegreeType } from '../api/candidates/types/enums/academic-degree-type';
import { PositionLevel } from '../api/candidates/types/enums/position-level';
import { WorkplaceType } from '../api/candidates/types/enums/workplace-type';
import { Resource } from '../enums/resource';
import { Action } from '../enums/action';
import { LanguageProficiency } from '../api/candidates/types/enums/language-proficiency';
import { Proficiency } from '../api/candidates/types/enums/proficiency';
import { AcademicStatus } from '../api/candidates/types/enums/academic-status';
import { Role } from '../api/users/types/enums/role';
import path from 'path';

const def: swaggerJSDocs.Options = {
    openapi: '3.0.0',
    swaggerDefinition: {
        openapi: '3.0.0',
        info: {
            title: 'API Documentation',
            version: '1.0.0',
            description: 'API Documentation',
        },
        schemes: ['http', 'https'],
    },
    servers: [
        {
            url: `http://${config.api.host}:${config.api.port}`,
            description: 'http server',
        },
        {
            url: `https://${config.api.host}:${config.api.port}`,
            description: 'https server',
        },
    ],
    apis: ['./src/api/**/*.ts'],
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const swaggerSpec: any = swaggerJSDocs({
    ...def,
    apis: ['./src/**/*.ts'],
});

swaggerSpec.components = swaggerSpec.components || {};
swaggerSpec.components.schemas = swaggerSpec.components.schemas || {};

const enums = [
    {
        schemaName: 'AcademicDegreeTypeSchema',
        enum: AcademicDegreeType,
    },
    {
        schemaName: 'BenefitSchema',
        enum: Benefit,
    },
    {
        schemaName: 'ContractTypeSchema',
        enum: ContractType,
    },
    {
        schemaName: 'EmploymentTypeSchema',
        enum: EmploymentType,
    },
    {
        schemaName: 'PositionLevelSchema',
        enum: PositionLevel,
    },
    {
        schemaName: 'WorkplaceTypeSchema',
        enum: WorkplaceType,
    },
    {
        schemaName: 'ResourceSchema',
        enum: Resource,
    },
    {
        schemaName: 'ActionSchema',
        enum: Action,
    },
    {
        schemaName: 'LanguageProficiencySchema',
        enum: LanguageProficiency,
    },
    {
        schemaName: 'ProficiencySchema',
        enum: Proficiency,
    },
    {
        schemaName: 'AcademicStatusSchema',
        enum: AcademicStatus,
    },
    {
        schemaName: 'RoleSchema',
        enum: Role,
    },
];

enums.forEach(({ schemaName, enum: e }) => {
    swaggerSpec.components.schemas[schemaName] = {
        type: 'string',
        enum: Object.values(e),
    };
});

swaggerSpec.components.securitySchemes = {
    BearerAuth: {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
    },
};

swaggerSpec.security = [
    {
        BearerAuth: [],
    },
];

export const useSwagger = (app: Express) => {
    const customPath = `${def.servers[0].url}/static/swagger/custom`;

    app.use(
        '/api-docs',
        swaggerUi.serve,
        swaggerUi.setup(swaggerSpec, {
            customSiteTitle: 'TalentHub',
            customCssUrl: `${customPath}.css`,
            customJs: `${customPath}.js`,
        }),
    );

    app.use('/static/swagger/custom.js', (_, res) => {
        res.sendFile(path.resolve(__dirname, '../../static/swagger/script.js'));
    });

    app.use('/static/swagger/custom.css', (_, res) => {
        res.sendFile(path.resolve(__dirname, '../../static/swagger/style.css'));
    });
};
