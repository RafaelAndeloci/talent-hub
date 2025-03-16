import { DataTypes, Model, ModelStatic } from 'sequelize';
import database from '../../config/database';
import {
    addressColumn,
    phoneColumn,
    primaryColumn,
    socialMediasColumns,
} from '../../constants/database-column.def';
import {
    AcademicBackground,
    AcademicDegreeLevel,
    Achievement,
    Benefit,
    Candidate,
    CandidateLanguage,
    CandidateSkill,
    EmploymentRegime,
    EmploymentType,
    ProfessionalExperience,
    Reference,
    SkillType,
} from '@talent-hub/shared';
import { PositionLevel } from '@talent-hub/shared/types/position-level';
import { WorkplaceType } from '@talent-hub/shared/types/workplace-type';
import { Moment } from 'moment';
import { UserModelAttr } from '../users/user-model';
import { Language } from '@talent-hub/shared/types/language';
import { LanguageProficiency } from '@talent-hub/shared/types/language-proficiency';
import AchievementType from '@talent-hub/shared/types/achievement-type';
import AcademicStatus from '@talent-hub/shared/types/academic-status';

// Attributes Types

type AcademicBackgroundModelAttrInternal = Omit<
    AcademicBackground,
    'candidate' | 'course' | 'institution' | 'period'
> & {
    periodStart: Moment;
    periodEnd: Moment | null;
    courseId: string;
    institutionId: string;
    candidateId: string;
};

export type AcademicBackgroundModelAttr = AcademicBackgroundModelAttrInternal & {
    course: {
        id: string;
        name: string | null;
        degreeType: AcademicDegreeLevel | null;
    };
    institution: {
        id: string;
        name: string | null;
    };
};

export type ProfessionalExperienceModelAttr = Omit<
    ProfessionalExperience,
    'candidate' | 'period'
> & {
    periodStart: Moment;
    periodEnd: Moment | null;
    candidateId: string;
};

export type CandidateLanguageModelAttr = Omit<CandidateLanguage, 'candidate'> & {
    candidateId: string;
};

export type CandidateReferenceModelAttr = Omit<Reference, 'candidate' | 'contact'> & {
    candidateId: string;
    contactEmail: string;
    contactPhone: string;
};

export type AchievementModelAttr = Omit<Achievement, 'candidate' | 'credential'> & {
    candidateId: string;
    credentialId: string | null;
    credentialUrl: string | null;
};

type CandidateSkillModelAttrInternal = Omit<CandidateSkill, 'candidate' | 'skill'> & {
    candidateId: string;
    skillId: string;
};

export type CandidateSkillModelAttr = CandidateSkillModelAttrInternal & {
    skill: {
        id: string;
        name: string | null;
        type: SkillType | null;
    };
};

export type CandidateModelAttrInternal = Omit<
    Candidate,
    | 'contact'
    | 'social'
    | 'academicBackgrounds'
    | 'professionalExperiences'
    | 'languages'
    | 'references'
    | 'achievements'
    | 'skills'
    | 'preferences'
> & {
    employmentRegimePreference: EmploymentRegime;
    employmentTypePreference: EmploymentType;
    workplaceTypePreference: WorkplaceType;
    benefitsPreference: Benefit[];
    positionLevelPreference: PositionLevel;
    salaryExpectation: number;
    contactEmail: string;
    contactPhone: string;
    linkedin: string | null;
    github: string | null;
    website: string | null;
    facebook: string | null;
    instagram: string | null;
    twitter: string | null;
    medium: string | null;
    youtube: string | null;
};

export type CandidateModelAttr = CandidateModelAttrInternal & {
    academicBackgrounds: AcademicBackgroundModelAttr[];
    professionalExperiences: ProfessionalExperienceModelAttr[];
    languages: CandidateLanguageModelAttr[];
    references: CandidateReferenceModelAttr[];
    achievements: AchievementModelAttr[];
    skills: CandidateSkillModelAttr[];
};

// Models
export class CandidateSkillModel extends Model<CandidateSkillModelAttrInternal> {
    static associate(models: { Skill: ModelStatic<Model> }) {
        CandidateSkillModel.belongsTo(models.Skill, {
            foreignKey: 'skillId',
            onDelete: 'CASCADE',
        });

        models.Skill.hasMany(CandidateSkillModel, {
            foreignKey: 'skillId',
            as: 'candidates',
        });
    }
}

export class CandidateReferenceModel extends Model<CandidateReferenceModelAttr> {
    static associate(models: { Candidate: ModelStatic<Model> }) {
        CandidateReferenceModel.belongsTo(models.Candidate, {
            foreignKey: 'candidateId',
            onDelete: 'CASCADE',
        });

        models.Candidate.hasMany(CandidateReferenceModel, {
            foreignKey: 'candidateId',
            as: 'references',
        });
    }
}

export class AchievementModel extends Model<AchievementModelAttr> {
    static associate(models: { Candidate: ModelStatic<Model> }) {
        AchievementModel.belongsTo(models.Candidate, {
            foreignKey: 'candidateId',
            onDelete: 'CASCADE',
        });

        models.Candidate.hasMany(AchievementModel, {
            foreignKey: 'candidateId',
            as: 'achievements',
        });
    }
}

export class CandidateLanguageModel extends Model<CandidateLanguageModelAttr> {
    static associate(models: { Candidate: ModelStatic<Model> }) {
        CandidateLanguageModel.belongsTo(models.Candidate, {
            foreignKey: 'candidateId',
            onDelete: 'CASCADE',
        });

        models.Candidate.hasMany(CandidateLanguageModel, {
            foreignKey: 'candidateId',
            as: 'languages',
        });
    }
}

export class ProfessionalExperienceModel extends Model<ProfessionalExperienceModelAttr> {
    static associate(models: { Candidate: ModelStatic<Model> }) {
        ProfessionalExperienceModel.belongsTo(models.Candidate, {
            foreignKey: 'candidateId',
            onDelete: 'CASCADE',
        });

        models.Candidate.hasMany(ProfessionalExperienceModel, {
            foreignKey: 'candidateId',
            as: 'professionalExperiences',
        });
    }
}

export class AcademicBackgroundModel extends Model<AcademicBackgroundModelAttrInternal> {
    static associate(models: {
        Course: ModelStatic<Model>;
        AcademicInstitution: ModelStatic<Model>;
        Candidate: ModelStatic<Model<UserModelAttr>>;
    }) {
        AcademicBackgroundModel.belongsTo(models.Course, {
            foreignKey: 'courseId',
            onDelete: 'CASCADE',
        });

        AcademicBackgroundModel.belongsTo(models.AcademicInstitution, {
            foreignKey: 'institutionId',
            onDelete: 'CASCADE',
        });

        AcademicBackgroundModel.belongsTo(models.Candidate, {
            foreignKey: 'candidateId',
            onDelete: 'CASCADE',
        });

        models.Candidate.hasMany(AcademicBackgroundModel, {
            foreignKey: 'candidateId',
            as: 'academicBackgrounds',
        });
    }
}

export class CandidateModel extends Model<CandidateModelAttrInternal> {
    static associate(models: {
        User: ModelStatic<Model>;
        CandidateSkill: ModelStatic<Model>;
        CandidateReference: ModelStatic<Model>;
        Achievement: ModelStatic<Model>;
        CandidateLanguage: ModelStatic<Model>;
        ProfessionalExperience: ModelStatic<Model>;
        AcademicBackground: ModelStatic<Model>;
        Course: ModelStatic<Model>;
        AcademicInstitution: ModelStatic<Model>;
        Skill: ModelStatic<Model>;
    }) {
        CandidateModel.beforeFind((options) => {
            options.include = [
                {
                    model: models.AcademicBackground,
                    as: 'academicBackgrounds',
                    attributes: {
                        exclude: ['candidateId', 'courseId', 'institutionId'],
                    },
                    include: [
                        {
                            model: models.Course,
                            as: 'course',
                            attributes: ['id', 'name', 'degreeType'],
                        },
                        {
                            model: models.AcademicInstitution,
                            as: 'institution',
                            attributes: ['id', 'name'],
                        },
                    ],
                },
                {
                    model: models.ProfessionalExperience,
                    as: 'professionalExperiences',
                    attributes: {
                        exclude: ['candidateId'],
                    },
                },
                {
                    model: models.CandidateLanguage,
                    as: 'languages',
                    attributes: {
                        exclude: ['candidateId'],
                    },
                },
                {
                    model: models.CandidateReference,
                    as: 'references',
                    attributes: {
                        exclude: ['candidateId'],
                    },
                },
                {
                    model: models.Achievement,
                    as: 'achievements',
                    attributes: {
                        exclude: ['candidateId'],
                    },
                },
                {
                    model: models.CandidateSkill,
                    as: 'skills',
                    attributes: {
                        exclude: ['candidateId', 'skillId'],
                    },
                    include: [
                        {
                            model: models.Skill,
                            as: 'skill',
                            attributes: ['id', 'name', 'type'],
                        },
                    ],
                },
            ];
        });
    }
}

// Tables
CandidateModel.init(
    {
        id: { ...primaryColumn },
        fullName: { type: DataTypes.STRING, allowNull: false },
        userId: { type: DataTypes.UUID, allowNull: false, unique: true },
        birthDate: { type: DataTypes.DATEONLY, allowNull: false },
        cvUrl: { type: DataTypes.STRING, allowNull: true, validate: { isUrl: true } },
        about: { type: DataTypes.TEXT('long'), allowNull: true },
        professionalHeadline: { type: DataTypes.STRING, allowNull: true },
        bannerUrl: { type: DataTypes.STRING, allowNull: true },
        address: { ...addressColumn },
        hobbies: { type: DataTypes.ARRAY(DataTypes.STRING), allowNull: true },
        ...socialMediasColumns,
        isAvailableForWork: { type: DataTypes.BOOLEAN, allowNull: false },
        allowThirdPartyApplications: { type: DataTypes.BOOLEAN, allowNull: false },
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
        contactEmail: { type: DataTypes.STRING, allowNull: false, validate: { isEmail: true } },
        contactPhone: { ...phoneColumn },
        salaryExpectation: { type: DataTypes.FLOAT, allowNull: true, validate: { min: 0 } },
    },
    { sequelize: database, paranoid: true, modelName: 'Candidate' },
);

CandidateSkillModel.init(
    {
        id: { ...primaryColumn },
        level: {
            type: DataTypes.INTEGER,
            allowNull: false,
            validate: {
                min: 1,
                max: 10,
            },
        },
        candidateId: { type: DataTypes.UUID, allowNull: false },
        skillId: { type: DataTypes.UUID, allowNull: false },
    },
    { sequelize: database, modelName: 'CandidateSkill' },
);

CandidateLanguageModel.init(
    {
        id: { ...primaryColumn },
        language: { type: DataTypes.ENUM(...Object.values(Language)), allowNull: false },
        writtenLevel: {
            type: DataTypes.ENUM(...Object.values(LanguageProficiency)),
            allowNull: false,
        },
        spokenLevel: {
            type: DataTypes.ENUM(...Object.values(LanguageProficiency)),
            allowNull: false,
        },
        readingLevel: {
            type: DataTypes.ENUM(...Object.values(LanguageProficiency)),
            allowNull: false,
        },
        listeningLevel: {
            type: DataTypes.ENUM(...Object.values(LanguageProficiency)),
            allowNull: false,
        },
        candidateId: { type: DataTypes.UUID, allowNull: false },
    },
    { sequelize: database, modelName: 'CandidateLanguage' },
);

CandidateReferenceModel.init(
    {
        id: { ...primaryColumn },
        name: { type: DataTypes.STRING, allowNull: false },
        position: { type: DataTypes.STRING, allowNull: false },
        company: { type: DataTypes.STRING, allowNull: true },
        relationship: { type: DataTypes.STRING, allowNull: false },
        candidateId: { type: DataTypes.UUID, allowNull: false },
        contactEmail: { type: DataTypes.STRING, allowNull: false, validate: { isEmail: true } },
        contactPhone: { ...phoneColumn },
    },
    {
        sequelize: database,
        modelName: 'CandidateReference',
    },
);

AchievementModel.init(
    {
        id: { ...primaryColumn },
        type: { type: DataTypes.ENUM(...Object.values(AchievementType)), allowNull: false },
        name: { type: DataTypes.STRING, allowNull: false },
        issuer: { type: DataTypes.STRING, allowNull: false },
        workload: { type: DataTypes.FLOAT, allowNull: true, validate: { min: 0 } },
        issueDate: { type: DataTypes.DATEONLY, allowNull: true },
        expirationDate: { type: DataTypes.DATEONLY, allowNull: true },
        candidateId: { type: DataTypes.UUID, allowNull: false },
        credentialId: { type: DataTypes.UUID, allowNull: true },
        credentialUrl: { type: DataTypes.STRING, allowNull: true, validate: { isUrl: true } },
    },
    {
        sequelize: database,
        modelName: 'Achievement',
    },
);

ProfessionalExperienceModel.init(
    {
        id: { ...primaryColumn },
        address: { ...addressColumn },
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
        isCurrent: { type: DataTypes.BOOLEAN, allowNull: false },
        position: { type: DataTypes.STRING, allowNull: false },
        description: { type: DataTypes.TEXT('long'), allowNull: true },
        company: { type: DataTypes.STRING, allowNull: false },
        responsabilities: { type: DataTypes.ARRAY(DataTypes.STRING), allowNull: true },
        candidateId: { type: DataTypes.UUID, allowNull: false },
        periodStart: { type: DataTypes.DATEONLY, allowNull: false },
        periodEnd: { type: DataTypes.DATEONLY, allowNull: true },
    },
    {
        sequelize: database,
        modelName: 'ProfessionalExperience',
    },
);

AcademicBackgroundModel.init(
    {
        id: { ...primaryColumn },
        status: { type: DataTypes.ENUM(...Object.values(AcademicStatus)), allowNull: false },
        isCurrent: { type: DataTypes.BOOLEAN, allowNull: false },
        semesters: { type: DataTypes.INTEGER, allowNull: true },
        currentSemester: { type: DataTypes.INTEGER, allowNull: true },
        institutionRegistrationNumber: { type: DataTypes.STRING, allowNull: true },
        gradePointAverage: { type: DataTypes.FLOAT, allowNull: true },
        expectedGraduation: { type: DataTypes.DATEONLY, allowNull: true },
        candidateId: { type: DataTypes.UUID, allowNull: false },
        periodStart: { type: DataTypes.DATEONLY, allowNull: false },
        periodEnd: { type: DataTypes.DATEONLY, allowNull: true },
        courseId: { type: DataTypes.UUID, allowNull: false },
        institutionId: { type: DataTypes.UUID, allowNull: false },
    },
    {
        sequelize: database,
        modelName: 'AcademicBackground',
    },
);
