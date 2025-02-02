import { Op } from 'sequelize';
import * as uuid from 'uuid';

import { ApiError } from '../../types/api-error';
import { Role } from '../users/types/enums/role';
import { companyRepository } from './company-repository';
import { Company } from './types/company';
import { CompanyBusiness } from './types/company-business';
import { companyParser } from './company-parser';
import _ from 'lodash';
import { fileStorageService } from '../../services/file-storage-service';

export const companyBusiness: CompanyBusiness = {
    findById: async ({ companyId, context }) => {
        const company = await companyRepository.findById(companyId);
        if (!company) {
            ApiError.throwNotFound(`company with id ${company} not found`);
            return null!;
        }

        return companyParser.toDto({ company, userRole: context.user.role });
    },

    findAll: async ({ query, context }) => {
        const companies = await companyRepository.findAll(query);
        return companies.parse((company) =>
            companyParser.toDto({ company, userRole: context.user.role }),
        );
    },

    create: async ({ payload }) => {
        const existing = await companyRepository.exists({
            [Op.or]: [{ cnpj: payload.cnpj }, { legalName: payload.legalName }],
        });
        if (existing) {
            ApiError.throwConflict('company already exists');
        }

        const company: Company = {
            id: uuid.v4(),
            ...payload,
            gallery: [],
        };

        await companyRepository.create(company);

        return companyParser.toDto({ company, userRole: Role.companyAdmin });
    },

    update: async ({ companyId, payload }) => {
        const company = await companyRepository.findById(companyId);
        if (!company) {
            ApiError.throwNotFound(`company with id ${companyId} not found`);
            return null!;
        }

        const updated = _.merge(company, payload);
        await companyRepository.update(updated);

        return companyParser.toDto({ company: updated, userRole: Role.companyAdmin });
    },

    remove: async ({ companyId }) => {
        const company = await companyRepository.findById(companyId);
        if (!company) {
            ApiError.throwNotFound(`company with id ${companyId} not found`);
        }

        await companyRepository.deleteById(companyId);
    },

    setBanner: async ({ companyId, file }) => {
        const company = await companyRepository.findById(companyId);
        if (!company) {
            ApiError.throwNotFound(`company with id ${companyId} not found`);
        }

        const key = `company-${companyId}-banner.${file.mimetype.split('/')[1]}`;
        const url = await fileStorageService.upload({
            key,
            file: file.content,
            contentType: file.mimetype,
        });

        if (!url) {
            ApiError.throwInternalServerError('failed to upload file');
        }

        company.bannerUrl = url;

        await companyRepository.update(company);

        return companyParser.toDto({ company, userRole: Role.companyAdmin });
    },

    setLogo: async ({ companyId, file }) => {
        const company = await companyRepository.findById(companyId);
        if (!company) {
            ApiError.throwNotFound(`company with id ${companyId} not found`);
        }

        const key = `company-${companyId}-logo.${file.mimetype.split('/')[1]}`;
        const url = await fileStorageService.upload({
            key,
            file: file.content,
            contentType: file.mimetype,
        });

        if (!url) {
            ApiError.throwInternalServerError('failed to upload file');
        }

        company.logoUrl = url;

        await companyRepository.update(company);

        return companyParser.toDto({ company, userRole: Role.companyAdmin });
    },

    setGaleryItem: async ({ companyId, picture, order }) => {
        const company = await companyRepository.findById(companyId);
        if (!company) {
            ApiError.throwNotFound(`company with id ${companyId} not found`);
        }

        const key = `company-${companyId}-gallery-${order}.${picture.mimetype.split('/')[1]}`;
        const url = await fileStorageService.upload({
            key,
            file: picture.content,
            contentType: picture.mimetype,
        });

        if (!url) {
            ApiError.throwInternalServerError('failed to upload file');
        }

        const existing = company.gallery.find((g) => g.order === order);
        if (existing) {
            existing.url = url;
        } else {
            company.gallery.push({ url, order });
        }

        company.gallery = company.gallery.sort((a, b) => a.order - b.order);

        await companyRepository.update(company);

        return companyParser.toDto({ company, userRole: Role.companyAdmin });
    },

    deleteGalleryItem: async ({ companyId, order }) => {
        const company = await companyRepository.findById(companyId);
        if (!company) {
            ApiError.throwNotFound(`company with id ${companyId} not found`);
        }

        if (order) {
            const index = company.gallery.findIndex((item) => item.order === order);
            if (index === -1) {
                ApiError.throwNotFound('gallery item not found');
            }

            await fileStorageService.deleteFile({
                key: company.gallery[index].url,
            });

            company.gallery = company.gallery.filter((item) => item.order !== order);
        } else {
            await Promise.all(
                company.gallery.map(async (item) => {
                    await fileStorageService.deleteFile({
                        key: item.url,
                    });
                }),
            );

            company.gallery = [];
        }

        await companyRepository.update(company);

        return companyParser.toDto({ company, userRole: Role.companyAdmin });
    },
};
