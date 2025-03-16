import {
    AcademicDegreeLevel as AcademicDegreeLevel,
    Benefit,
    CourseProfile,
    EmploymentRegime,
    JobOpening,
    JobOpeningStatus,
    Language,
    LanguageProficiencyProfile,
    SkillProfile,
    SkillType,
} from '@talent-hub/shared';
import { DataTypes, Model, ModelStatic } from 'sequelize';
import { primaryColumn } from '../../constants/database-column.def';
import database from '../../config/database';
import { LanguageProficiency } from '@talent-hub/shared/types/language-proficiency';
import { PositionLevel } from '@talent-hub/shared/types/position-level';

type SkillProfileModelAttrInternal = Omit<SkillProfile, 'skill'> & {
    id: string;
    jobOpeningId: string;
    skillId: string;
};

export type SkillProfileModelAttr = SkillProfileModelAttrInternal & {
    skillName: string | null;
    skillType: SkillType | null;
};

type CourseProfileModelAttrInternal = Omit<CourseProfile, 'course' | 'semestreRange'> & {
    id: string;
    courseId: string;
    semestreMin: number | null;
    semestreMax: number | null;
    jobOpeningId: string;
};
export type CourseProfileModelAttr = CourseProfileModelAttrInternal & {
    couseName: string | null;
};
export type LanguageProficiencyProfileModelAttr = LanguageProficiencyProfile & {
    id: string;
    jobOpeningId: string;
};

type JobOpeningModelAttrInternal = Omit<
    JobOpening,
    'benefits' | 'profile' | 'company' | 'salaryRange'
> & {
    customBenefits: string[];
    fixedBenefits: Benefit[];
    desiredYearsOfExperience: number | null;
    desiredMinimumEducationLevel: AcademicDegreeLevel | null;
    desiredGradePointAverageMin: number | null;
    desiredCertifications: string[];
    companyId: string;
    salaryMin: number | null;
    salaryMax: number | null;
};

export type JobOpeningModelAttr = JobOpeningModelAttrInternal & {
    desiredCourses: CourseProfileModelAttr[];
    desiredLanguages: LanguageProficiencyProfileModelAttr[];
    desiredSkills: SkillProfileModelAttr[];
    companyTradeName: string | null;
};

export class SkillProfileModel extends Model<SkillProfileModelAttrInternal> {
    static associate({ Skill }: { Skill: ModelStatic<Model> }) {
        SkillProfileModel.belongsTo(Skill, {
            foreignKey: 'skillId',
            as: 'skill',
        });
        Skill.hasMany(SkillProfileModel, {
            foreignKey: 'skillId',
            as: 'skillProfiles',
        });
    }
}
SkillProfileModel.init(
    {
        id: { ...primaryColumn },
        skillId: { type: DataTypes.UUID, allowNull: false },
        mandatory: { type: DataTypes.BOOLEAN, allowNull: false },
        minLevel: {
            type: DataTypes.INTEGER,
            allowNull: false,
            validate: {
                min: 1,
                max: 10,
            },
        },
        jobOpeningId: { type: DataTypes.UUID, allowNull: false },
    },
    { modelName: 'SkillProfile', sequelize: database },
);

export class CourseProfileModel extends Model<CourseProfileModelAttrInternal> {
    static associate({ Course }: { Course: ModelStatic<Model> }) {
        CourseProfileModel.belongsTo(Course, {
            foreignKey: 'courseId',
            as: 'course',
        });
        Course.hasMany(CourseProfileModel, {
            foreignKey: 'courseId',
            as: 'courseProfiles',
        });
    }
}
CourseProfileModel.init(
    {
        id: { ...primaryColumn },
        courseId: { type: DataTypes.UUID, allowNull: false },
        semestreMin: { type: DataTypes.INTEGER, allowNull: true },
        semestreMax: { type: DataTypes.INTEGER, allowNull: true },
        completed: { type: DataTypes.BOOLEAN, allowNull: false },
        gradePointAverageMin: { type: DataTypes.DECIMAL(3, 2), allowNull: true },
        jobOpeningId: { type: DataTypes.UUID, allowNull: false },
    },
    { modelName: 'CourseProfile', sequelize: database },
);

export class LanguageProficiencyProfileModel extends Model<LanguageProficiencyProfileModelAttr> {}
LanguageProficiencyProfileModel.init(
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
        jobOpeningId: { type: DataTypes.UUID, allowNull: false },
    },
    {
        modelName: 'LanguageProficiencyProfile',
        sequelize: database,
    },
);

export class JobOpeningModel extends Model<JobOpeningModelAttrInternal> {
    static associate({
        Company,
        Skill,
        Course,
    }: {
        Company: ModelStatic<Model>;
        Skill: ModelStatic<Model>;
        Course: ModelStatic<Model>;
    }) {
        JobOpeningModel.belongsTo(Company, {
            foreignKey: 'companyId',
            as: 'company',
        });

        JobOpeningModel.hasMany(CourseProfileModel, {
            foreignKey: 'jobOpeningId',
            as: 'desiredCourses',
        });
        CourseProfileModel.belongsTo(JobOpeningModel, {
            foreignKey: 'jobOpeningId',
        });

        JobOpeningModel.hasMany(LanguageProficiencyProfileModel, {
            foreignKey: 'jobOpeningId',
            as: 'desiredLanguages',
        });
        LanguageProficiencyProfileModel.belongsTo(JobOpeningModel, {
            foreignKey: 'jobOpeningId',
        });

        JobOpeningModel.hasMany(SkillProfileModel, {
            foreignKey: 'jobOpeningId',
            as: 'desiredSkills',
        });
        SkillProfileModel.belongsTo(JobOpeningModel, {
            foreignKey: 'jobOpeningId',
        });

        JobOpeningModel.beforeFind((options) => {
            options.include = [
                {
                    model: Company,
                    as: 'company',
                    attributes: ['id', 'tradeName'],
                },
                {
                    model: SkillProfileModel,
                    as: 'desiredSkills',
                    include: [
                        {
                            model: Skill,
                            as: 'skill',
                            attributes: ['id', 'name', 'type'],
                        },
                    ],
                },
                {
                    model: CourseProfileModel,
                    as: 'desiredCourses',
                    include: [
                        {
                            model: Course,
                            as: 'course',
                            attributes: ['id', 'name'],
                        },
                    ],
                },
                {
                    model: LanguageProficiencyProfileModel,
                    as: 'desiredLanguages',
                },
            ];
        });

        JobOpeningModel.prototype.toJSON = function () {
            const { desiredSkills, desiredCourses, desiredLanguages, company, companyId, ...rest } =
                this.get() as JobOpeningModelAttrInternal & {
                    company: { id: string; tradeName: string | null };
                    desiredSkills: {
                        id: string;
                        skill: {
                            id: string;
                            name: string | null;
                            type: SkillType | null;
                        };
                    }[];
                    desiredCourses: {
                        id: string;
                        course: {
                            id: string;
                            name: string | null;
                        };
                    }[];
                    desiredLanguages: LanguageProficiencyProfileModelAttr[];
                };

            return {
                ...rest,
                desiredSkills: desiredSkills.map(({ skill, ...rest }) => ({
                    ...rest,
                    skillId: skill.id,
                    skillName: skill.name,
                    skillType: skill.type,
                })),
                desiredCourses: desiredCourses.map(({ course, ...rest }) => ({
                    ...rest,
                    courseId: course.id,
                    couseName: course.name,
                })),
                desiredLanguages,
                companyTradeName: company.tradeName,
                companyId: company.id,
            };
        };
    }
}
JobOpeningModel.init(
    {
        id: { ...primaryColumn },
        position: { type: DataTypes.STRING, allowNull: false },
        positionLevel: { type: DataTypes.ENUM(...Object.values(PositionLevel)), allowNull: false },
        employmentRegime: {
            type: DataTypes.ENUM(...Object.values(EmploymentRegime)),
            allowNull: false,
        },
        deadline: {
            type: DataTypes.DATE,
            allowNull: false,
        },
        responsibilities: {
            type: DataTypes.ARRAY(DataTypes.STRING),
            allowNull: false,
            defaultValue: [],
        },
        requirements: {
            type: DataTypes.ARRAY(DataTypes.JSONB),
            allowNull: false,
            defaultValue: [],
        },
        companyId: {
            type: DataTypes.UUID,
            allowNull: false,
        },
        customBenefits: {
            type: DataTypes.ARRAY(DataTypes.STRING),
            allowNull: false,
            defaultValue: [],
        },
        fixedBenefits: {
            type: DataTypes.ARRAY(DataTypes.ENUM(...Object.values(Benefit))),
            allowNull: false,
            defaultValue: [],
        },
        desiredYearsOfExperience: {
            type: DataTypes.INTEGER,
            allowNull: true,
        },
        desiredMinimumEducationLevel: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        desiredGradePointAverageMin: {
            type: DataTypes.DECIMAL(3, 2),
            allowNull: true,
        },
        salaryMin: {
            type: DataTypes.DECIMAL(10, 2),
            allowNull: true,
        },
        salaryMax: {
            type: DataTypes.DECIMAL(10, 2),
            allowNull: true,
        },
        desiredCertifications: {
            type: DataTypes.ARRAY(DataTypes.STRING),
            allowNull: false,
            defaultValue: [],
        },
        status: {
            type: DataTypes.ENUM(...Object.values(JobOpeningStatus)),
            allowNull: false,
        },
        selectedApplicationId: {
            type: DataTypes.UUID,
            allowNull: true,
        },
    },
    {
        modelName: 'JobOpening',
        sequelize: database,
        tableName: 'job_openings',
        paranoid: true,
        underscored: true,
        timestamps: true,
        //TODO: unique
        // indexes: [
        //     {
        //         fields: ['company_id', 'position'],
        //         unique: true,
        //         where: {
        //             status: {
        //                 [Op.in]: [
        //                     JobOpeningStatus.Open,
        //                     JobOpeningStatus.Paused,
        //                     JobOpeningStatus.Draft,
        //                 ],
        //             },
        //         },
        //     },
        // ],
    },
);
