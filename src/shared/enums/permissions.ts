import { Role } from '../../api/users/types/enums/role'
import { Action } from './action'
import { Resource } from './resource'

type Permission = {
  role: Role
  actionsPerResource: {
    resource: keyof typeof Resource
    actions: Action[]
  }[]
}

export const Permissions = Object.freeze([
  {
    role: Role.candidate,
    actionsPerResource: [
      {
        resource: Resource.candidates,
        actions: [
          Action.create,
          Action.readById,
          Action.updateCandidateBanner,
          Action.updateCandidateCv,
        ],
      },
      {
        resource: Resource.users,
        actions: [
          Action.create,
          Action.resetUserPassword,
          Action.updateUserProfilePicture,
        ],
      },
    ],
  },
  {
    role: Role.sysAdmin,
    actionsPerResource: [
      {
        resource: Resource.candidates,
        actions: [
          Action.create,
          Action.delete,
          Action.readAll,
          Action.readById,
          Action.updateCandidateBanner,
          Action.updateCandidateCv,
        ],
      },
      {
        resource: Resource.users,
        actions: [
          Action.create,
          Action.delete,
          Action.readAll,
          Action.readById,
          Action.updateUserProfilePicture,
          Action.resetUserPassword,
        ],
      },
    ],
  },
] as Permission[])
