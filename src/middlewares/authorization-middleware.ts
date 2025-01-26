/* eslint-disable @typescript-eslint/no-explicit-any */
import { Request, Response, NextFunction } from 'express'
import { ApiError } from '../shared/types/api-error'
import { Action } from '../shared/enums/action'
import { AuthContext } from '../api/users/types/dtos/auth-context'
import { Permissions } from '../shared/enums/permissions'
import { Resource } from '../shared/enums/resource'

export const authorize =
  ({
    resource,
    action,
  }: {
    resource: keyof typeof Resource
    action: keyof typeof Action
  }): any =>
  (
    _req: Request,
    res: Response<any, AuthContext | Record<string, any>>,
    next: NextFunction,
  ): any => {
    const { user } = res.locals as AuthContext
    const routeWithoutAuthentication = !user

    if (routeWithoutAuthentication) {
      next()
      return
    }

    const userPermissions = Permissions.find((p) => p.role === user.role)
    if (!userPermissions) {
      ApiError.throwWithoutExpose(
        `${user.role} not contains defined permissions`,
      )
    }

    if (
      !userPermissions!.actionsPerResource.some(
        (ap) => ap.resource === resource && ap.actions.includes(action),
      )
    ) {
      ApiError.throwUnauthorized(
        `user cannot performe action ${action} on resource ${resource}`,
      )
    }

    next()
  }
