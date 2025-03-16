import { Action } from '../enums/action';
import { Permissions } from '../enums/permissions';
import { Resource } from '../enums/resource';
import { AnyHandler } from '../types/handler';
import { RequestContext } from '../types/request-context';
import ApiError from '../utils/api-error';

type AuthorizeMiddleware = ({
    resource,
    action,
}: {
    resource: Resource;
    action: Action;
}) => AnyHandler;

export const authorize: AuthorizeMiddleware =
    ({ resource, action }) =>
    (_, res, next) => {
        const { user } = res.locals as RequestContext;
        if (!user) {
            ApiError.throwUnauthorized('user is not authenticated');
        }

        const userPermissions = Permissions.find((p) => p.role === user.role);
        if (!userPermissions) {
            ApiError.throwWithoutExpose(`${user.role} not contains defined permissions`);
        }

        if (
            !userPermissions!.actionsPerResource.some(
                (ap) => ap.resource === resource && ap.actions.includes(action),
            )
        ) {
            ApiError.throwForbidden(
                `user cannot performe action ${action} on resource ${resource}`,
            );
        }

        next();
    };
