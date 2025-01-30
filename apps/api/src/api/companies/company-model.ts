import { DataTypes, Model } from 'sequelize';
import { isValidCnpj } from '../../utils/document-validator';
import { ApiError } from '../../types/api-error';
import { Address } from '../../types/address';
import {
    addressColumn,
    emailColumn,
    phoneColumn,
    primaryColumn,
    urlColumn,
} from '../../constants/database-column.def';
import { database } from '../../config/database';

export interface CompanyModelAttr {
    id: string;
    tradeName: string;
    legalName: string;
    cnpj: string;
    employeesQuantity: number;
    foundationYear: number;
    linkedin: string | null;
    github: string | null;
    instagram: string | null;
    facebook: string | null;
    twitter: string | null;
    youtube: string | null;
    medium: string | null;
    website: string | null;
    about: string | null;
    contactPhone: string;
    contactEmail: string;
    address: Address;
    bannerUrl: string | null;
    logoUrl: string | null;
    mission: string | null;
    vision: string | null;
    values: string[] | null;
    industry: string;
}

export class CompanyModel extends Model<CompanyModelAttr> {}
CompanyModel.init(
    {
        id: primaryColumn,
        tradeName: { type: DataTypes.STRING(150), allowNull: false },
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
        linkedin: urlColumn,
        github: urlColumn,
        instagram: urlColumn,
        facebook: urlColumn,
        twitter: urlColumn,
        youtube: urlColumn,
        medium: urlColumn,
        website: urlColumn,
        about: { type: DataTypes.TEXT, allowNull: true },
        contactPhone: phoneColumn,
        contactEmail: emailColumn,
        address: addressColumn,
        bannerUrl: urlColumn,
        logoUrl: urlColumn,
        mission: { type: DataTypes.TEXT, allowNull: true },
        vision: { type: DataTypes.TEXT, allowNull: true },
        values: { type: DataTypes.ARRAY(DataTypes.STRING), allowNull: true },
        industry: { type: DataTypes.STRING(100), allowNull: false },
    },
    { sequelize: database, modelName: 'Company', tableName: 'companies' },
);
