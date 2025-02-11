import { DataTypes, Model } from 'sequelize';
import database from '../../../config/database';
import { primaryColumn } from '../../../constants/database-column.def';
import { EmploymentType, WorkplaceType, PositionLevel } from '@talent-hub/shared';
import { CandidateProfessionalExperienceModelAttr } from '../../../types/candidate-professional-experience-model-attr';

export class CandidateProfessionalExperienceModel extends Model<CandidateProfessionalExperienceModelAttr> {}

CandidateProfessionalExperienceModel.init(
    {
        id: primaryColumn,
        position: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        description: {
            type: DataTypes.TEXT,
            allowNull: true,
        },
        company: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        employmentType: {
            type: DataTypes.ENUM(...Object.values(EmploymentType)),
            allowNull: false,
        },
        workplaceType: {
            type: DataTypes.ENUM(...Object.values(WorkplaceType)),
            allowNull: false,
        },
        positionLevel: {
            type: DataTypes.ENUM(...Object.values(PositionLevel)),
            allowNull: false,
        },
        isCurrent: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: false,
        },
        startYear: {
            type: DataTypes.INTEGER,
            allowNull: false,
            validate: {
                min: 1900,
                max: 2100,
            },
        },
        startMonth: {
            type: DataTypes.INTEGER,
            allowNull: false,
            validate: {
                min: 1,
                max: 12,
            },
        },
        endYear: {
            type: DataTypes.INTEGER,
            allowNull: true,
            validate: {
                min: 1900,
                max: 2100,
            },
        },
        endMonth: {
            type: DataTypes.INTEGER,
            allowNull: true,
            validate: {
                min: 1,
                max: 12,
            },
        },
        location: {
            type: DataTypes.JSONB,
            allowNull: true,
        },
        relatedSkills: {
            type: DataTypes.ARRAY(DataTypes.STRING),
            allowNull: false,
            defaultValue: [],
        },
        responsibilities: {
            type: DataTypes.ARRAY(DataTypes.STRING),
            allowNull: false,
            defaultValue: [],
        },
    },
    {
        sequelize: database,
        underscored: true,
        timestamps: false,
        tableName: 'candidate_professional_experiences',
        modelName: 'CandidateProfessionalExperience',
    },
);
