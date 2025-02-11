import {
    AuthContext,
    Company,
    CompanyDto,
    FindAllCompaniesDto,
    FindAllCompaniesQuery,
    Id,
    UpdateCompanyPayload,
} from '@talent-hub/shared';
import { RequestHandler } from 'express';

export type CompanyController = {
    findById: RequestHandler<Id, CompanyDto, void, void, AuthContext>;
    findAll: RequestHandler<void, FindAllCompaniesDto, void, FindAllCompaniesQuery, AuthContext>;
    create: RequestHandler<void, CompanyDto, Omit<Company, 'id'>, void, AuthContext>;
    update: RequestHandler<Id, CompanyDto, UpdateCompanyPayload, void, AuthContext>;
    remove: RequestHandler<Id, void, void, void, AuthContext>;
    setLogo: RequestHandler<Id, CompanyDto, void, void, AuthContext>;
    setBanner: RequestHandler<Id, CompanyDto, void, void, AuthContext>;
    setGalleryItem: RequestHandler<Id & { order: number }, CompanyDto, void, void, AuthContext>;
    deleteGalleryItem: RequestHandler<Id & { order?: number }, CompanyDto, void, void, AuthContext>;
};
