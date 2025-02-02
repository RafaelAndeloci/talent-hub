import { RequestHandler } from 'express';
import { Id } from '../../../types/id';
import { AuthContext } from '../../users/types/auth-context';
import { Company } from './company';
import { CompanyDto } from './company-dto';
import { UpdateCompanyPayload } from './update-company-payload';
import { FindAllCompaniesDto } from './find-all-companies-dto';
import { FindAllCompaniesQuery } from './find-all-companies-query';

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
