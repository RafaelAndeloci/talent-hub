import CompanyController from './types/company-controller';
import companyBusiness from './company-business';
import HTTPStatus from 'http-status';

const companyController: CompanyController = {
  async create(req, res, next) {
    try {
      const { body: createCompany } = req;

      const company = await companyBusiness.create(createCompany);
      res.status(HTTPStatus.CREATED).send(company);
    } catch (error) {
      next(error);
    }
  },

  async update(req, res, next) {
    try {
      const {
        body: updateCompany,
        params: { id },
      } = req;

      const company = await companyBusiness.update(id, updateCompany);

      res.status(HTTPStatus.OK).send(company);
    } catch (error) {
      next(error);
    }
  },

  async remove(req, res, next) {
    try {
      const {
        params: { id },
      } = req;

      await companyBusiness.remove(id);

      res.status(HTTPStatus.NO_CONTENT).send();
    } catch (e) {
      next(e);
    }
  },

  async findById(req, res, next) {
    try {
      const {
        params: { id },
      } = req;

      const company = await companyBusiness.findById(id);

      res.status(HTTPStatus.OK).send(company);
    } catch (error) {
      next(error);
    }
  },

  async findAll(req, res, next) {
    try {
      const { query } = req;

      const companies = await companyBusiness.findAll(query);

      res.status(HTTPStatus.OK).send(companies);
    } catch (error) {
      next(error);
    }
  },
};

export default companyController;
