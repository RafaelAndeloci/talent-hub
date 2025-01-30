import { DataTypes, Model } from 'sequelize';
import _ from 'lodash';

import { database } from '../../../config/database';
import { primaryColumn, urlColumn, addressColumn } from '../../../constants/database-column.def';
import { EmploymentType } from '../types/enums/employment-type';
import { WorkplaceType } from '../types/enums/workplace-type';
import { PositionLevel } from '../types/enums/position-level';
import { ContractType } from '../types/enums/contract-type';
import { Benefit } from '../types/enums/benefit';
import {
    CandidateAchievementModel,
    CandidateEducationalExperienceModel,
    CandidateLanguageModel,
    CandidateProfessionalExperienceModel,
    CandidateReferenceModel,
} from '.';
import { UserModel } from '../../users/user-model';
import { CandidateModelAttr } from './types/candidate-model-attr';

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
            type: DataTypes.STRING(100),
            allowNull: false,
        },
        userId: {
            type: DataTypes.UUID,
            allowNull: false,
            unique: true,
        },
        birthDate: {
            type: DataTypes.DATE,
            allowNull: false,
        },
        cvUrl: urlColumn,
        about: {
            type: DataTypes.TEXT,
            allowNull: true,
        },
        professionalHeadline: {
            type: DataTypes.STRING(100),
            allowNull: true,
        },
        bannerUrl: urlColumn,
        hobbies: {
            type: DataTypes.ARRAY(DataTypes.STRING(50)),
            allowNull: false,
            defaultValue: [],
        },
        linkedin: urlColumn,
        github: urlColumn,
        twitter: urlColumn,
        facebook: urlColumn,
        instagram: urlColumn,
        youtube: urlColumn,
        medium: urlColumn,
        website: urlColumn,
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
        contractTypePreference: {
            type: DataTypes.ENUM(...Object.values(ContractType)),
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
            type: DataTypes.STRING(100),
            allowNull: false,
            validate: {
                isEmail: true,
            },
        },
        contactPhone: {
            type: DataTypes.STRING(100),
            allowNull: false,
            validate: {
                is: /^\d{11}$/,
            },
        },
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
    const candidate = this.get() as CandidateModelAttrInternal;

    return _.omit(candidate, ['createdAt', 'updatedAt', 'deletedAt', 'userId']);
};
