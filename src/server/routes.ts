import { Router, Request, Response, NextFunction } from 'express'
import { z } from 'zod'
import { authenticate } from '../middlewares/auth-middleware'
import { candidatesRouter } from '../api/candidates/candidate-routes'
import { logger } from '../shared/services/logging-service'
import { validate } from '../middlewares/validation-middleware'
import { fileStorageService } from '../shared/services/file-storage-service'
import { userRouter } from '../api/users/user-router'

export const apiRoutes = Router()

apiRoutes.use('/candidates', authenticate, candidatesRouter)
apiRoutes.use('/users', userRouter)

export const staticRoutes = Router()

const staticFileHandler: (
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  req: Request<{ fileKey: string }, any, any, any>,
  res: Response,
  next: NextFunction,
) => Promise<void> = async (req, res, next) => {
  try {
    const { fileKey } = req.params
    const { stream, contentType } = await fileStorageService.getFileStream({
      key: fileKey,
    })

    if (!stream) {
      res.status(404).send('File not found')
      return
    }

    res.setHeader('Content-Type', contentType)
    stream.pipe(res)

    stream.on('error', (error) => {
      logger.error(error)
      res.status(500).send('Internal server error')
    })

    stream.on('end', () => {
      res.end()
    })

    const destroyEvents = ['close', 'error', 'end']
    destroyEvents.forEach((event) => {
      res.on(event, () => {
        stream.destroy()
      })
    })
  } catch (err) {
    next(err)
  }
}

staticRoutes.get(
  '/:fileKey',
  authenticate,
  validate(
    z.object({
      params: z.object({
        fileKey: z.string(),
      }),
    }),
  ),
  staticFileHandler,
)
