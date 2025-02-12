import { AcademicInstitutionModelAttr } from '../../types/academic-institution-model-attr';
import database from '../../config/database';
import { DataTypes, Model } from 'sequelize';
import { primaryColumn } from '../../constants/database-column.def';
import { AcademicDegreeType, SuggestionStatus } from '@talent-hub/shared';
import { UserModel } from '../users/user-model';

export class AcademicInstitutionModel extends Model<AcademicInstitutionModelAttr> {}

AcademicInstitutionModel.init(
    {
        id: primaryColumn,
        name: {
            type: DataTypes.STRING(100),
            allowNull: false,
        },
        city: {
            type: DataTypes.STRING(100),
            allowNull: false,
        },
        website: {
            type: DataTypes.STRING(250),
            allowNull: false,
            validate: {
                isUrl: true,
            },
        },
        offeredDegreeTypes: {
            type: DataTypes.ARRAY(DataTypes.ENUM(...Object.values(AcademicDegreeType))),
            allowNull: false,
        },
        validatedAt: {
            type: DataTypes.DATE,
            allowNull: true,
        },
        validatedBy: {
            type: DataTypes.UUID,
            allowNull: true,
        },
        status: {
            type: DataTypes.ENUM(...Object.values(SuggestionStatus)),
            allowNull: false,
            defaultValue: SuggestionStatus.Pending,
        },
    },
    {
        sequelize: database,
    },
);

AcademicInstitutionModel.belongsTo(UserModel, {
    foreignKey: 'validatedBy',
    as: 'validator',
});
