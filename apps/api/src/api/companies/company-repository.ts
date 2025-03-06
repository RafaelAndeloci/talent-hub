import { Company } from '@talent-hub/shared';
import { CompanyModel, CompanyModelAttr } from './company-model';
import { CompanyParser } from './company-parser';
import { Repository } from '../../services/repository';
import { Op } from 'sequelize';

export class CompanyRepository extends Repository<Company, CompanyModelAttr, CompanyModel> {
    constructor() {
        super(CompanyModel, CompanyParser);
    }

    public async existsBy(args: { legalName: string; cnpj: string }) {
        return await CompanyModel.count({
            where: {
                [Op.or]: [{ legalName: args.legalName }, { cnpj: args.cnpj }],
            },
        });
    }
}
