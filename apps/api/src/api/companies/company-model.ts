import { DataTypes, Model } from 'sequelize';
import { isValidCnpj } from '../../utils/document-validator';
import {
    emailColumn,
    phoneColumn,
    primaryColumn,
    socialMediasColumns,
} from '../../constants/database-column.def';
import database from '../../config/database';
import ApiError from '../../utils/api-error';
import { Company } from '@talent-hub/shared';

export type CompanyModelAttr = Omit<Company, 'social' | 'contact'> & {
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
export class CompanyModel extends Model<CompanyModelAttr> {}

CompanyModel.init(
    {
        id: { ...primaryColumn },
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
        employeesQuantity: { type: DataTypes.INTEGER, allowNull: false, validate: { min: 1 } },
        foundationYear: { type: DataTypes.INTEGER, allowNull: false, validate: { min: 1900 } },
        ...socialMediasColumns,
        about: { type: DataTypes.TEXT, allowNull: true },
        contactPhone: { ...phoneColumn },
        contactEmail: { ...emailColumn },
        values: { type: DataTypes.ARRAY(DataTypes.STRING), allowNull: true },
        address: { type: DataTypes.JSONB, allowNull: false },
        mission: { type: DataTypes.TEXT, allowNull: true },
        vision: { type: DataTypes.TEXT, allowNull: true },
        industry: { type: DataTypes.STRING, allowNull: false },
        gallery: { type: DataTypes.JSONB, allowNull: true },
        banner: { type: DataTypes.STRING, allowNull: true, validate: { isUrl: true } },
        logo: { type: DataTypes.STRING, allowNull: true, validate: { isUrl: true } },
    },
    { sequelize: database, modelName: 'Company' },
);
