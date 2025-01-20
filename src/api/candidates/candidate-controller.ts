import CandidateController from './types/candidate-controller';
import candidateBusiness from './candidate-business';
import HTTPStatus from 'http-status';

const candidateController: CandidateController = {
  async findById(req, res) {
    const { id } = req.params;
    const candidate = await candidateBusiness.findById(id);
    res.status(HTTPStatus.OK).json(candidate);
  },

  async findAll(req, res) {
    const candidates = await candidateBusiness.findAll(req.query);
    res.status(HTTPStatus.OK).json(candidates);
  },

  async create(req, res) {
    const candidate = await candidateBusiness.create({
      payload: req.body,
      userId: res.locals.user.id,
    });
    res.status(HTTPStatus.CREATED).json(candidate);
  },

  async update(req, res) {
    const { id } = req.params;
    const candidate = await candidateBusiness.update({
      id,
      payload: req.body,
    });
    res.status(HTTPStatus.OK).json(candidate);
  },

  async remove(req, res) {
    const { id } = req.params;
    await candidateBusiness.remove(id);
    res.status(HTTPStatus.NO_CONTENT).end();
  },
};

export default candidateController;
