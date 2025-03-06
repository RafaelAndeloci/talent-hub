import {
    Company,
    CompanyDto,
    CompanyPayload,
    PagedResponse,
    QueryArgs,
    UserDto,
} from '@talent-hub/shared';
import { CompanyRepository } from './company-repository';
import ApiError from '../../utils/api-error';
import { CompanyParser } from './company-parser';
import Role from '@talent-hub/shared/types/role';
import FileStorageService from '../../services/file-storage-service';
import { InputFile } from '../../types/input-file';

export class CompanyBusiness {
    public constructor(private companyRepository = new CompanyRepository()) {}

    public findById: (args: { companyId: string; user: UserDto }) => Promise<CompanyDto> = async ({
        companyId,
        user,
    }) => {
        const company = await this.companyRepository.findById(companyId);
        if (!company) {
            ApiError.throwNotFound(`company with id ${company} not found`);
        }

        return CompanyParser.toDto({ company, userRole: user.role });
    };

    public findAll: (args: {
        query: QueryArgs<Company>;
        user: UserDto;
    }) => Promise<PagedResponse<CompanyDto>> = async ({ query, user }) => {
        const companies = await this.companyRepository.findAll(query);
        return companies.parse((company) => CompanyParser.toDto({ company, userRole: user.role }));
    };

    public create: (args: { payload: Company }) => Promise<CompanyDto> = async ({ payload }) => {
        const existing = await this.companyRepository.existsBy({
            legalName: payload.legalName,
            cnpj: payload.cnpj,
        });
        if (existing) {
            ApiError.throwConflict('company already exists');
        }

        const company = CompanyParser.newInstance(payload);
        await this.companyRepository.create({ entity: company });

        return CompanyParser.toDto({ company, userRole: Role.SysAdmin });
    };

    public update: (args: { companyId: string; payload: CompanyPayload }) => Promise<CompanyDto> =
        async ({ companyId, payload }) => {
            const company = await this.companyRepository.findById(companyId);
            if (!company) {
                ApiError.throwNotFound(`company with id ${companyId} not found`);
            }

            const updated = CompanyParser.merge({
                original: company,
                changes: payload,
            });
            await this.companyRepository.update({ entity: updated });

            return CompanyParser.toDto({ company: updated, userRole: Role.SysAdmin });
        };

    public remove: (args: { companyId: string }) => Promise<void> = async ({ companyId }) => {
        const company = await this.companyRepository.findById(companyId);
        if (!company) {
            ApiError.throwNotFound(`company with id ${companyId} not found`);
        }

        await this.companyRepository.deleteById({ id: companyId });
    };

    public setBanner: (args: { companyId: string; file: InputFile }) => Promise<CompanyDto> =
        async ({ companyId, file }) => {
            const company = await this.companyRepository.findById(companyId);
            if (!company) {
                ApiError.throwNotFound(`company with id ${companyId} not found`);
            }

            const key = `company-${companyId}-banner.${file.mimetype.split('/')[1]}`;
            const url = await FileStorageService.upload({
                key,
                file: file.content,
                contentType: file.mimetype,
            });

            if (!url) {
                ApiError.throwInternalServerError('failed to upload file');
            }

            company.banner = url;

            await this.companyRepository.update({ entity: company });

            return CompanyParser.toDto({ company, userRole: Role.SysAdmin });
        };

    public setLogo: (args: { companyId: string; file: InputFile }) => Promise<CompanyDto> = async ({
        companyId,
        file,
    }) => {
        const company = await this.companyRepository.findById(companyId);
        if (!company) {
            ApiError.throwNotFound(`company with id ${companyId} not found`);
        }

        const key = `company-${companyId}-logo.${file.mimetype.split('/')[1]}`;
        const url = await FileStorageService.upload({
            key,
            file: file.content,
            contentType: file.mimetype,
        });

        if (!url) {
            ApiError.throwInternalServerError('failed to upload file');
        }

        company.logo = url;

        await this.companyRepository.update({ entity: company });

        return CompanyParser.toDto({ company, userRole: Role.SysAdmin });
    };

    public setGalleryItem: (args: {
        companyId: string;
        picture: InputFile;
        order: number;
    }) => Promise<CompanyDto> = async ({ companyId, picture, order }) => {
        const company = await this.companyRepository.findById(companyId);
        if (!company) {
            ApiError.throwNotFound(`company with id ${companyId} not found`);
        }

        const key = `company-${companyId}-gallery-${order}.${picture.mimetype.split('/')[1]}`;
        const url = await FileStorageService.upload({
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

        await this.companyRepository.update({ entity: company });

        return CompanyParser.toDto({ company, userRole: Role.SysAdmin });
    };

    public deleteGalleryItem: (args: { companyId: string; order?: number }) => Promise<CompanyDto> =
        async ({ companyId, order }) => {
            const company = await this.companyRepository.findById(companyId);
            if (!company) {
                ApiError.throwNotFound(`company with id ${companyId} not found`);
            }

            if (order) {
                const index = company.gallery.findIndex((item) => item.order === order);
                if (index === -1) {
                    ApiError.throwNotFound('gallery item not found');
                }

                await FileStorageService.deleteFile({
                    key: company.gallery[index].url,
                });

                company.gallery = company.gallery.filter((item) => item.order !== order);
            } else {
                await Promise.all(
                    company.gallery.map(async (item) => {
                        await FileStorageService.deleteFile({
                            key: item.url,
                        });
                    }),
                );

                company.gallery = [];
            }

            await this.companyRepository.update({ entity: company });

            return CompanyParser.toDto({ company, userRole: Role.SysAdmin });
        };
}
