import { Model, DataTypes, Op } from 'sequelize';
import moment from 'moment';

import database from '../../config/database';
import { CompanyModel } from '../companies/company-model';
import { primaryColumn } from '../../constants/database-column.def';
import { SkillModel } from '../skills/skill-model';
import {
    Proficiency,
    JobOpeningStatus,
    PositionLevel,
    WorkplaceType,
    EmploymentType,
    EmploymentRegime,
    Benefit,
} from '@talent-hub/shared/types';
import {
    JobOpeningSkillProfileModelAttr,
    JobOpeningModelAttr,
} from '../../types/job-opening-model-attr';

class JobOpeningSkillProfileModel extends Model<JobOpeningSkillProfileModelAttr> {}
export class JobOpeningModel extends Model<JobOpeningModelAttr> {}

JobOpeningSkillProfileModel.init(
    {
        skillId: {
            type: DataTypes.UUID,
            allowNull: false,
        },
        proficiencyLevel: {
            type: DataTypes.ENUM(...Object.values(Proficiency)),
            allowNull: false,
        },
        mandatory: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: false,
        },
        skill: {
            type: DataTypes.VIRTUAL,
        },
    },
    {
        sequelize: database,
        timestamps: false,
        modelName: 'JobOpeningSkillProfile',
        tableName: 'job_opening_skill_profiles',
    },
);

JobOpeningModel.init(
    {
        id: primaryColumn,
        position: {
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
        minimumSalary: {
            type: DataTypes.DECIMAL(10, 2),
            allowNull: true,
            validate: {
                min: 0,
            },
        },
        maximumSalary: {
            type: DataTypes.DECIMAL(10, 2),
            allowNull: true,
            validate: {
                min: 0,
            },
        },
        employmentRegime: {
            type: DataTypes.ENUM(...Object.values(EmploymentRegime)),
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
            defaultValue: [],
        },
        yearsOfExperience: {
            type: DataTypes.INTEGER,
            allowNull: false,
            validate: {
                min: 0,
            },
        },
        requirements: {
            type: DataTypes.ARRAY(DataTypes.JSONB),
            allowNull: false,
            defaultValue: [],
        },
        courses: {
            type: DataTypes.ARRAY(DataTypes.STRING),
        },
        languages: {
            type: DataTypes.ARRAY(DataTypes.JSONB),
        },
        certifications: {
            type: DataTypes.ARRAY(DataTypes.STRING),
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
                fields: ['company_id', 'position'],
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

JobOpeningModel.hasMany(JobOpeningSkillProfileModel, {
    foreignKey: 'job_opening_id',
    as: 'skills',
    onDelete: 'CASCADE',
});

JobOpeningSkillProfileModel.belongsTo(JobOpeningModel, {
    foreignKey: 'job_opening_id',
});

CompanyModel.hasMany(JobOpeningModel, {
    foreignKey: 'company_id',
    as: 'job_openings',
});

JobOpeningModel.belongsTo(CompanyModel, {
    foreignKey: 'company_id',
    as: 'company',
});

JobOpeningModel.beforeFind((options) => {
    options.include = [
        {
            model: JobOpeningSkillProfileModel,
            as: 'skillProfiles',
            include: [
                {
                    model: SkillModel,
                    as: 'skill',
                    where: {
                        id: {
                            [Op.col]: 'skill_profiles.skill_id',
                        },
                    },
                },
            ],
        },
    ];
});
