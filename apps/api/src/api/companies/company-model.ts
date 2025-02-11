import { DataTypes, Model } from 'sequelize';
import { isValidCnpj } from '../../utils/document-validator';
import { ApiError } from '../../types/api-error';
import {
    emailColumn,
    phoneColumn,
    primaryColumn,
    socialMediasColumns,
} from '../../constants/database-column.def';
import database from '../../config/database';
import { CompanyModelAttr } from '../../types/company-model-attr';

export class CompanyModel extends Model<CompanyModelAttr> {}
CompanyModel.init(
    {
        id: primaryColumn,
        tradeName: { type: DataTypes.STRING, allowNull: false },
        legalName: { type: DataTypes.STRING(200), allowNull: false },
        cnpj: {
            type: DataTypes.STRING(14),
            allowNull: false,
            validate: {
                isCnpj: (value: string) => {
                    if (!isValidCnpj({ cnpj: value })) {
                        ApiError.throwBadRequest('Invalid CNPJ');
                    }
                },
            },
        },
        employeesQuantity: {
            type: DataTypes.INTEGER,
            allowNull: false,
            validate: { min: 1 },
        },
        foundationYear: {
            type: DataTypes.INTEGER,
            allowNull: false,
            validate: { min: 1900 },
        },
        ...socialMediasColumns,
        about: { type: DataTypes.TEXT, allowNull: true },
        contactPhone: phoneColumn,
        contactEmail: emailColumn,
        location: {
            type: DataTypes.JSON,
            allowNull: false,
        },
        bannerUrl: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        logoUrl: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        mission: { type: DataTypes.TEXT, allowNull: true },
        vision: { type: DataTypes.TEXT, allowNull: true },
        values: { type: DataTypes.ARRAY(DataTypes.STRING), allowNull: true },
        industry: { type: DataTypes.STRING, allowNull: false },
        gallery: { type: DataTypes.ARRAY(DataTypes.JSON), allowNull: true },
    },
    { sequelize: database, modelName: 'Company', tableName: 'companies' },
);
