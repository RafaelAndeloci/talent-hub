import { CreateCandidateRequestHandler } from './types/requests/create-candidate'
import { candidateBusiness } from './candidate-business'

const create: CreateCandidateRequestHandler = async (req, res, next) => {
  try {
    const candidate = await candidateBusiness.create({
      userId: res.locals.user.id,
      payload: {
        ...req.body,
      },
    })

    res.status(201).json(candidate)
  } catch (error) {
    next(error)
  }
}

export const candidateController = Object.freeze({
  create,
})
