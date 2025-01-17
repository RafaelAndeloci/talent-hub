import CandidateController from './types/candidate-controller';
import candidateBusiness from './candidate-business';

const candidateController: CandidateController = {
  async findById(req, res) {
    const { id } = req.params;
    const candidate = await candidateBusiness.findById(id);
    res.status(200).json(candidate);
  },

  async findAll(req, res) {
    const candidates = await candidateBusiness.findAll(req.query);
    res.status(200).json(candidates);
  },

  async create(req, res) {
    const candidate = await candidateBusiness.create(req.body);
    res.status(201).json(candidate);
  },

  async update(req, res) {
    const { id } = req.params;
    const candidate = await candidateBusiness.update({
      id,
      payload: req.body,
    });
    res.status(200).json(candidate);
  },

  async remove(req, res) {
    const { id } = req.params;
    await candidateBusiness.remove(id);
    res.status(204).end();
  },
};

export default candidateController;
