import { DataTypes, Model } from 'sequelize';
import database from '../../../config/database';
import { primaryColumn } from '../../../constants/database-column.def';
import { AcademicStatus, AcademicDegreeType } from '@talent-hub/shared';
import { CandidateEducationalExperienceModelAttr } from '../../../types/candidate-education-experience-model-attr';

export class CandidateEducationalExperienceModel extends Model<CandidateEducationalExperienceModelAttr> {}

CandidateEducationalExperienceModel.init(
    {
        id: primaryColumn,
        degree: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        fieldOfStudy: {
            type: DataTypes.STRING,
            allowNull: true,
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
            type: DataTypes.STRING,
            allowNull: false,
        },
        institutionWebsite: {
            type: DataTypes.STRING,
            allowNull: true,
        },
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
            type: DataTypes.STRING,
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
        timestamps: false,
        tableName: 'candidate_educational_experiences',
        modelName: 'CandidateEducationalExperience',
    },
);
