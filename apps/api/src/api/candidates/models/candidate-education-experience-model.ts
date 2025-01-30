import { DataTypes, Model } from 'sequelize';
import { AcademicStatus } from '../types/enums/academic-status';
import { AcademicDegreeType } from '../types/enums/academic-degree-type';
import { database } from '../../../config/database';
import { CandidateEducationalExperienceModelAttr } from './types/candidate-education-experience-model-attr';
import { primaryColumn, urlColumn } from '../../../constants/database-column.def';

export class CandidateEducationalExperienceModel extends Model<CandidateEducationalExperienceModelAttr> {}

CandidateEducationalExperienceModel.init(
    {
        id: primaryColumn,
        degree: {
            type: DataTypes.STRING(100),
            allowNull: false,
        },
        fieldOfStudy: {
            type: DataTypes.STRING(100),
            allowNull: false,
        },
        status: {
            type: DataTypes.ENUM(...Object.values(AcademicStatus)),
            allowNull: false,
        },
        type: {
            type: DataTypes.ENUM(...Object.values(AcademicDegreeType)),
            allowNull: false,
        },
        institution: {
            type: DataTypes.STRING(100),
            allowNull: false,
        },
        institutionWebsite: urlColumn,
        description: {
            type: DataTypes.TEXT,
            allowNull: true,
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
        isCurrent: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: false,
        },
        semesters: {
            type: DataTypes.INTEGER,
            allowNull: true,
        },
        currentSemester: {
            type: DataTypes.INTEGER,
            allowNull: true,
        },
        institutionRegistrationNumber: {
            type: DataTypes.STRING(100),
            allowNull: true,
        },
        gradePointAverage: {
            type: DataTypes.DECIMAL,
            allowNull: true,
        },
        expectedGraduationYear: {
            type: DataTypes.INTEGER,
            allowNull: true,
            validate: {
                min: 1900,
                max: 2100,
            },
        },
        expectedGraduationMonth: {
            type: DataTypes.INTEGER,
            allowNull: true,
            validate: {
                min: 1,
                max: 12,
            },
        },
    },
    {
        sequelize: database,
        underscored: true,
        tableName: 'candidate_educational_experiences',
        modelName: 'CandidateEducationalExperience',
    },
);
