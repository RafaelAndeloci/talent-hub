import database from '../../config/database';
import { DataTypes, Model, ModelStatic } from 'sequelize';
import { primaryColumn } from '../../constants/database-column.def';
import { AcademicDegreeType, AcademicInstitution, SuggestionStatus } from '@talent-hub/shared';
import SuggestionModel from '../../types/suggestion-model';
import { UserModelAttr } from '../users/user-model';

export type AcademicInstitutionModelAttr = SuggestionModel<AcademicInstitution>;
export class AcademicInstitutionModel extends Model<AcademicInstitutionModelAttr> {
    static associate({ UserModel }: { UserModel: ModelStatic<Model<UserModelAttr>> }) {
        AcademicInstitutionModel.belongsTo(UserModel, {
            foreignKey: 'validatedBy',
            targetKey: 'id',
            as: 'validator',
        });

        UserModel.hasMany(AcademicInstitutionModel, {
            foreignKey: 'validatedBy',
            as: 'validatedAcademicInstitutions',
        });
    }
}

AcademicInstitutionModel.init(
    {
        id: primaryColumn,
        name: { type: DataTypes.STRING(100), allowNull: false },
        city: { type: DataTypes.STRING(100), allowNull: false },
        website: {
            type: DataTypes.STRING(250),
            allowNull: false,
            validate: { isUrl: true },
        },
        offeredDegreeTypes: {
            type: DataTypes.ARRAY(DataTypes.ENUM(...Object.values(AcademicDegreeType))),
            allowNull: false,
        },
        validatedAt: { type: DataTypes.DATE, allowNull: true },
        validatedBy: { type: DataTypes.UUID, allowNull: true },
        status: { type: DataTypes.ENUM(...Object.values(SuggestionStatus)), allowNull: false },
        suggestedBy: { type: DataTypes.UUID, allowNull: false },
        suggestedAt: { type: DataTypes.DATE, allowNull: false },
    },
    { modelName: 'AcademicInstitution', sequelize: database },
);
