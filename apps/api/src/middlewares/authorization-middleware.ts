/* eslint-disable @typescript-eslint/no-explicit-any */
import { Request, Response, NextFunction } from 'express';
import { ApiError } from '../types/api-error';
import { Action } from '../enums/action';
import { AuthContext } from '../api/users/types/auth-context';
import { Permissions } from '../enums/permissions';
import { Resource } from '../enums/resource';

export const authorize =
    ({ resource, action }: { resource: Resource; action: Action }): any =>
    (
        _req: Request,
        res: Response<any, AuthContext | Record<string, any>>,
        next: NextFunction,
    ): any => {
        const { user } = res.locals as AuthContext;
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
