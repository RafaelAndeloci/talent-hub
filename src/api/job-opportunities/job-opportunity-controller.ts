import jobOpportunityBusiness from './job-opportunity-business';
import JobOpportunityController from './types/job-opportunity-controller';
import HTTPStatus from 'http-status';

const jobOpportunityController: JobOpportunityController = {
  async create(req, res) {
    const { body } = req;

    const created = await jobOpportunityBusiness.create(body);

    res.status(HTTPStatus.CREATED).json(created);
  },

  async update(req, res) {
    const { body, params } = req;

    const updated = await jobOpportunityBusiness.update(params.id, body);

    res.status(HTTPStatus.OK).json(updated);
  },

  async remove(req, res) {
    const { params } = req;

    await jobOpportunityBusiness.remove(params.id);

    res.sendStatus(HTTPStatus.NO_CONTENT);
  },

  async findById(req, res) {
    const { params } = req;

    const jobOpportunity = await jobOpportunityBusiness.findById(params.id);

    res.status(HTTPStatus.OK).json(jobOpportunity);
  },

  async findAll(req, res) {
    const { query } = req;

    const pagedList = await jobOpportunityBusiness.findAll(query);

    res.status(HTTPStatus.OK).json(pagedList);
  },
};

export default jobOpportunityController;