import jobOpportunityBusiness from './job-opportunity-business';
import JobOpportunityController from './types/job-opportunity-controller';
import HTTPStatus from 'http-status';

const jobOpportunityController: JobOpportunityController = {
  async create(req, res, next) {
    try {
      const { body } = req;
      const created = await jobOpportunityBusiness.create(body);
      res.status(HTTPStatus.CREATED).json(created);
    } catch (error) {
      next(error);
    }
  },

  async update(req, res, next) {
    try {
      const { body, params } = req;
      const updated = await jobOpportunityBusiness.update(params.id, body);
      res.status(HTTPStatus.OK).json(updated);
    } catch (error) {
      next(error);
    }
  },

  async remove(req, res, next) {
    try {
      const { params } = req;
      await jobOpportunityBusiness.remove(params.id);
      res.sendStatus(HTTPStatus.NO_CONTENT);
    } catch (error) {
      next(error);
    }
  },

  async findById(req, res, next) {
    try {
      const { params } = req;
      const jobOpportunity = await jobOpportunityBusiness.findById(params.id);
      res.status(HTTPStatus.OK).json(jobOpportunity);
    } catch (error) {
      next(error);
    }
  },

  async findAll(req, res, next) {
    try {
      const { query } = req;
      const pagedList = await jobOpportunityBusiness.findAll(query);
      res.status(HTTPStatus.OK).json(pagedList);
    } catch (error) {
      next(error);
    }
  },
};

export default jobOpportunityController;
