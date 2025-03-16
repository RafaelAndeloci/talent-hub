import database from '../../config/database';
import { DataTypes, Model, ModelStatic } from 'sequelize';
import { primaryColumn } from '../../constants/database-column.def';
import { AcademicDegreeLevel, Course, SuggestionStatus } from '@talent-hub/shared';
import { UserModelAttr } from '../users/user-model';
import SuggestionModel from '../../types/suggestion-model';

export type CourseModelAttr = SuggestionModel<Course>;

export class CourseModel extends Model<CourseModelAttr> {
    static associate({ User }: { User: ModelStatic<Model<UserModelAttr>> }) {
        CourseModel.belongsTo(User, {
            foreignKey: 'validatedBy',
            targetKey: 'id',
            as: 'validator',
        });

        User.hasMany(CourseModel, { foreignKey: 'validatedBy', as: 'validatedCourses' });
    }
}

CourseModel.init(
    {
        id: { ...primaryColumn },
        name: { type: DataTypes.STRING(100), allowNull: false },
        degreeType: {
            type: DataTypes.ENUM(...Object.values(AcademicDegreeLevel)),
            allowNull: false,
        },
        status: { type: DataTypes.ENUM(...Object.values(SuggestionStatus)), allowNull: false },
        validatedBy: { type: DataTypes.UUID, allowNull: true },
        validatedAt: { type: DataTypes.DATE, allowNull: true },
        suggestedAt: { type: DataTypes.DATE, allowNull: false },
        suggestedBy: { type: DataTypes.UUID, allowNull: false },
    },
    { modelName: 'Course', sequelize: database },
);
