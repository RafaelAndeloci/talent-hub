import { z } from 'zod';
import { Logger } from '../services/logging-service';
import { fileStorageService } from '../services/file-storage-service';
import { validate } from '../middlewares/validation-middleware';
import { Router } from 'express';

export const getStaticFilesRouter = () => {
    const staticFilesRouter = Router();

    staticFilesRouter.get(
        '/static/:fileKey',
        validate(
            z.object({
                params: z.object({
                    fileKey: z.string(),
                }),
            }),
        ),
        async (req, res, next) => {
            try {
                const { fileKey } = req.params;
                const { stream, contentType } = await fileStorageService.getFileStream({
                    key: fileKey,
                });

                if (!stream) {
                    res.status(404).send('File not found');
                    return;
                }

                res.setHeader('Content-Type', contentType);
                stream.pipe(res);

                stream.on('error', (error) => {
                    Logger.error(error);
                    res.status(500).send('Internal server error');
                });

                stream.on('end', () => {
                    res.end();
                });

                const destroyEvents = ['close', 'error', 'end'];
                destroyEvents.forEach((event) => {
                    res.on(event, () => {
                        stream.destroy();
                    });
                });
            } catch (err) {
                next(err);
            }
        },
    );

    return staticFilesRouter;
};
