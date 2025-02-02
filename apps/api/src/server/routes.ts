import { Router } from 'express';
import klawSync from 'klaw-sync';
import path from 'path';
import { AnyRequestHandler, ApiResource, Route } from '../types/api-resource';
import { authorize } from '../middlewares/authorization-middleware';
import { validate } from '../middlewares/validation-middleware';
import { Resource } from '../enums/resource';
import { logger } from '../services/logging-service';
import { config } from '../config/environment';
import { authenticate } from '../middlewares/authentication-middleware';

const buildActionPipe = (
    resource: Resource,
    { auth, action, middlewares, schema, handler }: Route,
) => {
    const middlewarePipe: AnyRequestHandler[] = [];

    if (auth === true) {
        middlewarePipe.push(authenticate);
        middlewarePipe.push(authorize({ resource, action }));
    }

    if (middlewares) {
        middlewarePipe.push(...middlewares);
    }

    if (schema) {
        middlewarePipe.push(validate(schema));
    }

    middlewarePipe.push(async (req, res, next) => {
        try {
            const timer = logger.startTimer();
            logger.info(`Resource[${resource}]: ${action} stated ${timer.start}`);
            await handler(req, res, next);
            timer.done({ message: `Resource[${resource}]: ${action} completed in ` });
        } catch (e) {
            logger.error(`Resource[${resource}]: ${action} failed`, e);
            next(e);
        }
    });

    return middlewarePipe;
};

const findApiResources = async () => {
    const promises = klawSync(path.resolve(__dirname, '../api'), {
        traverseAll: true,
        nodir: true,
        filter: ({ path }) => path.indexOf('-routes') > 0,
    }).map(async ({ path }) => {
        const module = await import(path);
        return Object.values(module)[0] as ApiResource;
    });

    return await Promise.all(promises);
};

const logEndpoints = (apiResources: ApiResource[]) => {
    for (const { resource, routes } of apiResources) {
        logger.info(`Resource: ${resource}`);

        const rows = routes.map(({ method, path, auth }) => ({
            method: method.toUpperCase().padEnd(7),
            path: `${config.api.basePath}/${resource}${path}`,
            auth: auth ? 'on' : 'off',
        }));

        // eslint-disable-next-line no-console
        console.table(rows);
    }
};

export const buildApiRouter = async () => {
    try {
        const apiResources = await findApiResources();

        const routers = apiResources.map(({ resource, routes }) => {
            const endpointsRouter = Router();

            routes.forEach((route) => {
                const { path, method } = route;

                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                (endpointsRouter as any)[method](path, buildActionPipe(resource, route));
            });

            const resourceRouter = Router();
            resourceRouter.use(`/${resource}`, endpointsRouter);

            return resourceRouter;
        });

        const apiRouter = Router();

        apiRouter.use(config.api.basePath, routers);

        logEndpoints(apiResources);

        return apiRouter;
    } catch (error) {
        logger.error('Routes registration error:', error);
        process.exit(1);
    }
};
