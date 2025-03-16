import { Address } from '@talent-hub/shared';
import { DataTypes, ModelAttributeColumnOptions } from 'sequelize';
import ApiError from '../utils/api-error';
import { Uf } from '@talent-hub/shared/types/uf';

export const primaryColumn: ModelAttributeColumnOptions = {
    type: DataTypes.UUID,
    primaryKey: true,
};

export const addressColumn: ModelAttributeColumnOptions = {
    type: DataTypes.JSONB,
    allowNull: true,
    validate: {
        isAddress(value: any) {
            if (typeof value !== 'object') {
                return;
            }
            const address: Address = {
                street: value.street,
                number: value.number,
                complement: value.complement,
                neighborhood: value.neighborhood,
                city: value.city,
                uf: value.uf,
                zipCode: value.zipCode,
            };
            if (Object.values(address).some((v) => v === undefined)) {
                ApiError.throwBadRequest('invalid address');
            }
            if (/^\d{8}$/.test(address.zipCode) === false) {
                ApiError.throwBadRequest('invalid zip code, must be 8 digits');
            }
            if (!Object.values(Uf).includes(address.uf)) {
                ApiError.throwBadRequest('invalid uf');
            }
        },
    },
};

export const phoneColumn: ModelAttributeColumnOptions = {
    type: DataTypes.STRING(11),
    allowNull: true,
    validate: {
        isPhone(value: any) {
            if (/^\d{11}$/.test(value) === false) {
                ApiError.throwBadRequest('invalid phone number, must be 10 or 11 digits');
            }
        },
    },
};

export const emailColumn: ModelAttributeColumnOptions = {
    type: DataTypes.STRING(255),
    allowNull: true,
    validate: {
        isEmail: true,
    },
};

export const socialMediasColumns = {
    linkedin: { type: DataTypes.STRING, allowNull: true },
    github: { type: DataTypes.STRING, allowNull: true },
    twitter: { type: DataTypes.STRING, allowNull: true },
    facebook: { type: DataTypes.STRING, allowNull: true },
    instagram: { type: DataTypes.STRING, allowNull: true },
    youtube: { type: DataTypes.STRING, allowNull: true },
    medium: { type: DataTypes.STRING, allowNull: true },
    website: { type: DataTypes.STRING, allowNull: true },
};
