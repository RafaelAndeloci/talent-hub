import database from '../../config/database';
import { DataTypes, Model } from 'sequelize';
import { CourseModelAttr } from '../../types/course-model-attr';
import { primaryColumn } from '../../constants/database-column.def';
import { AcademicDegreeType, SuggestionStatus } from '@talent-hub/shared';
import { AcademicInstitutionModel } from '../academic-institutions/academic-institution-model';
import { UserModel } from '../users/user-model';
import { AcademicInstitutionModelAttr } from '../../types/academic-institution-model-attr';

export class CourseModel extends Model<CourseModelAttr> {}

CourseModel.init(
    {
        id: primaryColumn,
        name: {
            type: DataTypes.STRING(100),
            allowNull: false,
        },
        field: {
            type: DataTypes.STRING(100),
            allowNull: false,
        },
        degreeType: {
            type: DataTypes.ENUM(...Object.values(AcademicDegreeType)),
            allowNull: false,
        },
        status: {
            type: DataTypes.ENUM(...Object.values(SuggestionStatus)),
            allowNull: false,
        },
        validatedBy: {
            type: DataTypes.UUID,
            allowNull: true,
        },
        validatedAt: {
            type: DataTypes.DATE,
            allowNull: true,
        },
        institutionId: {
            type: DataTypes.UUID,
            allowNull: false,
        },
    },
    {
        modelName: 'Course',
        sequelize: database,
    },
);

CourseModel.belongsTo(AcademicInstitutionModel, {
    foreignKey: 'institutionId',
    targetKey: 'id',
    as: 'institution',
});

CourseModel.belongsTo(UserModel, {
    foreignKey: 'validatedBy',
    targetKey: 'id',
    as: 'validator',
});

CourseModel.beforeFind((options) => {
    options.include = [
        {
            model: AcademicInstitutionModel,
            as: 'institution',
        },
    ];
});

CourseModel.prototype.toJSON = function () {
    const values = this.get() as unknown as CourseModelAttr & {
        institution: AcademicInstitutionModelAttr;
    };

    values.institutionName = values.institution.name;
    return values;
};
