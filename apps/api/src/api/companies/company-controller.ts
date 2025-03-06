// import HTTPStatus from 'http-status';

// import { companyBusiness } from './company-business';
// import { CompanyController } from '../../types/company-controller';

// export const companyController: CompanyController = {
//     findById: async ({ params: { id: companyId } }, res) => {
//         const company = await companyBusiness.findById({
//             companyId,
//             context: res.locals,
//         });
//         res.status(HTTPStatus.OK).json(company);
//     },

//     findAll: async ({ query }, res) => {
//         const companies = await companyBusiness.findAll({
//             query,
//             context: res.locals,
//         });
//         res.status(HTTPStatus.OK).json(companies);
//     },

//     create: async ({ body: payload }, res) => {
//         const company = await companyBusiness.create({
//             payload,
//             context: res.locals,
//         });
//         res.status(HTTPStatus.CREATED).json(company);
//     },

//     update: async ({ params: { id: companyId }, body: payload }, res) => {
//         const company = await companyBusiness.update({
//             companyId,
//             payload,
//             context: res.locals,
//         });
//         res.status(HTTPStatus.OK).json(company);
//     },

//     remove: async ({ params: { id: companyId } }, res) => {
//         await companyBusiness.remove({ companyId, context: res.locals });
//         res.sendStatus(HTTPStatus.NO_CONTENT);
//     },

//     setBanner: async ({ params: { id: companyId }, file: { buffer, mimetype } = {} }, res) => {
//         const company = await companyBusiness.setBanner({
//             companyId,
//             file: {
//                 content: buffer!,
//                 mimetype: mimetype!,
//             },
//         });
//         res.status(HTTPStatus.OK).json(company);
//     },

//     setLogo: async ({ params: { id: companyId }, file: { buffer, mimetype } = {} }, res) => {
//         const company = await companyBusiness.setLogo({
//             companyId,
//             file: {
//                 content: buffer!,
//                 mimetype: mimetype!,
//             },
//         });
//         res.status(HTTPStatus.OK).json(company);
//     },

//     setGalleryItem: async (
//         { params: { id: companyId, order }, file: { buffer, mimetype } = {} },
//         res,
//     ) => {
//         const company = await companyBusiness.setGaleryItem({
//             companyId,
//             picture: {
//                 content: buffer!,
//                 mimetype: mimetype!,
//             },
//             order,
//         });
//         res.status(HTTPStatus.OK).json(company);
//     },

//     deleteGalleryItem: async ({ params: { id: companyId, order } }, res) => {
//         const company = await companyBusiness.deleteGalleryItem({
//             companyId,
//             order,
//         });
//         res.status(HTTPStatus.OK).json(company);
//     },
// };
import { RequestHandler } from 'express';
import { CompanyBusiness } from './company-business';
import { Company, CompanyDto, PagedResponse, QueryArgs, UserDto } from '@talent-hub/shared';

export class CompanyController {
    public constructor(private readonly companyBusiness = new CompanyBusiness()) {}

    public findById: RequestHandler<{ id: string }, CompanyDto, {}, {}, UserDto> = async (
        { params: { id: companyId } },
        res,
    ) => {
        const company = await this.companyBusiness.findById({
            companyId,
            user: res.locals,
        });
        res.json(company);
    };

    public findAll: RequestHandler<{}, PagedResponse<CompanyDto>, QueryArgs<Company>, {}, UserDto> =
        async (req, res) => {
            const companies = await this.companyBusiness.findAll({
                query: req.query,
                user: res.locals,
            });
            res.json(companies);
        };

    public create: RequestHandler<{}, CompanyDto, Company, {}, UserDto> = async (req, res) => {
        const company = await this.companyBusiness.create({
            payload: req.body,
        });
        res.status(201).json(company);
    }

    public update: RequestHandler<{ id: string }, CompanyDto, Company, {}, UserDto> = async (req, res) => {
        const company = await this.companyBusiness.update({
            companyId: req.params.id,
            payload: req.body,
        });
        res.json(company);
    }

    public remove: RequestHandler<{ id: string }, void, {}, {}, UserDto> = async (req, res) => {
        await this.companyBusiness.remove({
            companyId: req.params.id
        });
        res.sendStatus(204);
    }

    public setBanner: RequestHandler<{ id: string }, CompanyDto, {}, UserDto> = async (req, res) => {
        const company = await this.companyBusiness.setBanner({
            companyId: req.params.id,
            file: {
                content: req.file!.buffer,
                mimetype: req.file!.mimetype
            }
        });
        res.json(company);
    }

    public setLogo: RequestHandler<{ id: string }, CompanyDto, {}, UserDto> = async (req, res) => {
        const company = await this.companyBusiness.setLogo({
            companyId: req.params.id,
            file: {
                content: req.file!.buffer,
                mimetype: req.file!.mimetype
            }
        });
        res.json(company);
    }

    public setGalleryItem: RequestHandler<{ id: string; order: number }, CompanyDto, {}, UserDto> = async (req, res) => {
        const company = await this.companyBusiness.setGalleryItem({
            companyId: req.params.id,
            order: req.params.order,
            picture: {
                content: req.file!.buffer,
                mimetype: req.file!.mimetype
            }
        });

        res.json(company);
    }


    public deleteGalleryItem: RequestHandler<{ id: string; order: number }, CompanyDto, {}, UserDto> = async (req, res) => {
        const company = await this.companyBusiness.deleteGalleryItem({
            companyId: req.params.id,
            order: req.params.order
        });

        res.json(company);
    }
}
