import { Model, DataTypes, Op } from 'sequelize';
import moment from 'moment';

import database from '../../config/database';
import { PositionLevel } from '../candidates/types/enums/position-level';
import { WorkplaceType } from '../candidates/types/enums/workplace-type';
import { EmploymentType } from '../candidates/types/enums/employment-type';
import { ContractType } from '../candidates/types/enums/contract-type';
import { Benefit } from '../candidates/types/enums/benefit';
import { CompanyModel } from '../companies/company-model';
import { JobOpeningStatus } from './types/enums/job-opening-status';
import { primaryColumn } from '../../constants/database-column.def';
import { JobOpeningModelAttr } from './types/job-opening-model-attr';

export class JobOpeningModel extends Model<JobOpeningModelAttr> {}
JobOpeningModel.init(
    {
        id: primaryColumn,
        title: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        status: {
            type: DataTypes.ENUM(...Object.values(JobOpeningStatus)),
            allowNull: false,
        },
        companyId: {
            type: DataTypes.UUID,
            allowNull: false,
            references: {
                model: CompanyModel,
                key: 'id',
            },
        },
        selectedApplicationId: {
            type: DataTypes.UUID,
            allowNull: true,
        },
        description: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        positionLevel: {
            type: DataTypes.ENUM(...Object.values(PositionLevel)),
            allowNull: false,
        },
        workplaceType: {
            type: DataTypes.ENUM(...Object.values(WorkplaceType)),
            allowNull: false,
        },
        employmentType: {
            type: DataTypes.ENUM(...Object.values(EmploymentType)),
            allowNull: false,
        },
        salary: {
            type: DataTypes.DECIMAL(10, 2),
            allowNull: true,
            validate: {
                min: 0,
            },
        },
        contractType: {
            type: DataTypes.ENUM(...Object.values(ContractType)),
            allowNull: false,
        },
        benefits: {
            type: DataTypes.ARRAY(DataTypes.ENUM(...Object.values(Benefit))),
            allowNull: false,
        },
        deadline: {
            type: DataTypes.DATE,
            allowNull: false,
            stringify: (value) => moment(value as Date).format('YYYY-MM-DDTHH:mm:ss'),
        },
        responsibilities: {
            type: DataTypes.ARRAY(DataTypes.STRING),
            allowNull: false,
        },
        requirements: {
            type: DataTypes.ARRAY(DataTypes.STRING),
            allowNull: false,
        },
    },
    {
        sequelize: database,
        modelName: 'JobOpening',
        tableName: 'job_openings',
        paranoid: true,
        underscored: true,
        timestamps: true,
        indexes: [
            {
                fields: ['company_id', 'title'],
                unique: true,
                where: {
                    status: {
                        [Op.in]: [
                            JobOpeningStatus.open,
                            JobOpeningStatus.paused,
                            JobOpeningStatus.draft,
                        ],
                    },
                },
            },
        ],
    },
);
