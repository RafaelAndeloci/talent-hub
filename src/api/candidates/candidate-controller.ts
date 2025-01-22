import CandidateController from './types/candidate-controller';
import candidateBusiness from './candidate-business';
import HTTPStatus from 'http-status';
import logger from '../../services/logging-service';
import config from '../../config/environment';

const candidateController: CandidateController = {
  async findById(req, res, next) {
    try {
      const { id } = req.params;
      const candidate = await candidateBusiness.findById(id);
      res.status(HTTPStatus.OK).json(candidate);
    } catch (error) {
      next(error);
    }
  },

  async findAll(req, res, next) {
    try {
      const candidates = await candidateBusiness.findAll(req.query);
      res.status(HTTPStatus.OK).json(candidates);
    } catch (error) {
      next(error);
    }
  },

  async create(req, res, next) {
    try {
      const candidate = await candidateBusiness.create({
        payload: req.body,
        userId: res.locals.user.id,
      });
      res.status(HTTPStatus.CREATED).json(candidate);
    } catch (error) {
      next(error);
    }
  },

  async update(req, res, next) {
    try {
      const { id } = req.params;
      const candidate = await candidateBusiness.update({
        id,
        payload: req.body,
      });
      res.status(HTTPStatus.OK).json(candidate);
    } catch (error) {
      next(error);
    }
  },

  async remove(req, res, next) {
    try {
      const { id } = req.params;
      await candidateBusiness.remove(id);
      res.status(HTTPStatus.NO_CONTENT).end();
    } catch (error) {
      next(error);
    }
  },

  async updateCv(req, res, next) {
    try {
      const {
        file: { buffer, mimetype } = {},
        params: { id: candidateId },
      } = req;

      if (!buffer) {
        res.status(HTTPStatus.BAD_REQUEST).json({
          status: HTTPStatus['400_NAME'],
          code: HTTPStatus.BAD_REQUEST,
          message: 'File is required',
        } as any);

        return;
      }

      if (!mimetype || !config.allowedMimeTypes.documents.includes(mimetype)) {
        res.status(HTTPStatus.BAD_REQUEST).json({
          status: HTTPStatus['400_NAME'],
          code: HTTPStatus.BAD_REQUEST,
          message: `The document type is not allowed. Allowed types: ${config.allowedMimeTypes.documents.join(', ')}`,
        } as any);

        return;
      }

      const updated = await candidateBusiness.updateCv({
        candidateId,
        file: {
          buffer,
          mimetype,
        },
      });

      res.status(HTTPStatus.OK).json(updated);
    } catch (error) {
      next(error);
    }
  },
};

export default candidateController;
