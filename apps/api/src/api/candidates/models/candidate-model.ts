/* eslint-disable @typescript-eslint/no-explicit-any */
import { DataTypes, Model } from 'sequelize';

import database from '../../../config/database';
import {
    CandidateAchievementModel,
    CandidateEducationalExperienceModel,
    CandidateLanguageModel,
    CandidateProfessionalExperienceModel,
    CandidateReferenceModel,
} from '.';
import { UserModel } from '../../users/user-model';
import {
    addressColumn,
    phoneColumn,
    primaryColumn,
    socialMediasColumns,
} from '../../../constants/database-column.def';
import { CandidateModelAttr } from '../../../types/candidate-model-attr';
import {
    EmploymentRegime,
    EmploymentType,
    WorkplaceType,
    Benefit,
    PositionLevel,
} from '@talent-hub/shared';

type CandidateModelAttrInternal = Omit<
    CandidateModelAttr,
    | 'professionalExperiences'
    | 'educationalExperiences'
    | 'languages'
    | 'references'
    | 'achievements'
>;

export class CandidateModel extends Model<CandidateModelAttrInternal> {}

CandidateModel.init(
    {
        id: primaryColumn,
        fullName: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        userId: {
            type: DataTypes.UUID,
            allowNull: false,
            unique: true,
        },
        birthDate: {
            type: DataTypes.DATEONLY,
            allowNull: false,
        },
        cvUrl: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        about: {
            type: DataTypes.TEXT('long'),
            allowNull: true,
        },
        professionalHeadline: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        bannerUrl: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        hobbies: {
            type: DataTypes.ARRAY(DataTypes.STRING(200)),
            allowNull: false,
            defaultValue: [],
        },
        ...socialMediasColumns,
        isAvailableForWork: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: true,
        },
        allowThirdPartyApplications: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: true,
        },
        salaryPreference: {
            type: DataTypes.DECIMAL,
            allowNull: true,
        },
        employmentRegimePreference: {
            type: DataTypes.ENUM(...Object.values(EmploymentRegime)),
            allowNull: true,
        },
        employmentTypePreference: {
            type: DataTypes.ENUM(...Object.values(EmploymentType)),
            allowNull: true,
        },
        workplaceTypePreference: {
            type: DataTypes.ENUM(...Object.values(WorkplaceType)),
            allowNull: true,
        },
        benefitsPreference: {
            type: DataTypes.ARRAY(DataTypes.ENUM(...Object.values(Benefit))),
            allowNull: true,
        },
        positionLevelPreference: {
            type: DataTypes.ENUM(...Object.values(PositionLevel)),
            allowNull: true,
        },
        address: addressColumn,
        contactEmail: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                isEmail: true,
            },
        },
        contactPhone: phoneColumn,
    },
    {
        sequelize: database,
        underscored: true,
        paranoid: true,
        tableName: 'candidates',
        modelName: 'Candidate',
    },
);

CandidateModel.hasMany(CandidateProfessionalExperienceModel, {
    as: 'professionalExperiences',
    foreignKey: 'candidateId',
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
});

CandidateProfessionalExperienceModel.belongsTo(CandidateModel, {
    foreignKey: 'candidateId',
});

CandidateModel.hasMany(CandidateEducationalExperienceModel, {
    as: 'educationalExperiences',
    foreignKey: 'candidateId',
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
});
CandidateEducationalExperienceModel.belongsTo(CandidateModel, {
    foreignKey: 'candidateId',
});

CandidateModel.hasMany(CandidateLanguageModel, {
    as: 'languages',
    foreignKey: 'candidateId',
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
});
CandidateLanguageModel.belongsTo(CandidateModel, {
    foreignKey: 'candidateId',
});

CandidateModel.hasMany(CandidateReferenceModel, {
    as: 'references',
    foreignKey: 'candidateId',
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
});
CandidateReferenceModel.belongsTo(CandidateModel, {
    foreignKey: 'candidateId',
});

CandidateModel.hasMany(CandidateAchievementModel, {
    as: 'achievements',
    foreignKey: 'candidateId',
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
});
CandidateAchievementModel.belongsTo(CandidateModel, {
    foreignKey: 'candidateId',
});

CandidateModel.belongsTo(UserModel, {
    foreignKey: 'userId',
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
});
UserModel.hasOne(CandidateModel, {
    foreignKey: 'userId',
});

CandidateModel.prototype.toJSON = function () {
    const model = this.get() as any;
    delete model.createdAt;
    delete model.updatedAt;
    delete model.deletedAt;

    return model;
};
