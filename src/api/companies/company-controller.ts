import CompanyController from './types/company-controller';
import companyBusiness from './company-business';
import HTTPStatus from 'http-status';

const companyController: CompanyController = {
  async create(req, res) {
    const { body: createCompany } = req;

    const company = await companyBusiness.create(createCompany);

    res.status(HTTPStatus.CREATED).send(company);
  },

  async update(req, res) {
    const {
      body: updateCompany,
      params: { id },
    } = req;

    const company = await companyBusiness.update(id, updateCompany);

    res.status(HTTPStatus.OK).send(company);
  },

  async remove(req, res) {
    const {
      params: { id },
    } = req;

    await companyBusiness.remove(id);

    res.status(HTTPStatus.NO_CONTENT).send();
  },

  async findById(req, res) {
    const {
      params: { id },
    } = req;

    const company = await companyBusiness.findById(id);

    res.status(HTTPStatus.OK).send(company);
  },

  async findAll(req, res) {
    const { query } = req;

    const companies = await companyBusiness.findAll(query);

    res.status(HTTPStatus.OK).send(companies);
  },
};

export default companyController;