import { Role } from '../api/users/types/enums/role';
import { Action, AllActions } from './action';
import { AllResources, Resource } from './resource';

type Permission = {
    role: Role;
    actionsPerResource: {
        resource: Resource[keyof Resource];
        actions: Action[];
    }[];
};

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
                    Action.sendUserChangePasswordToken,
                    Action.updateUserProfilePicture,
                ],
            },
            {
                resource: Resource.companies,
                actions: [Action.readById, Action.readAll],
            },
            {
                resource: Resource.jobOpenings,
                actions: [Action.readAll, Action.readById],
            },
            {
                resource: Resource.jobApplications,
                actions: [Action.create, Action.readAll, Action.readById],
            },
        ],
    },
    {
        role: Role.sysAdmin,
        actionsPerResource: AllResources.map((r) => ({
            resource: r,
            actions: AllActions,
        })),
    },
] as Permission[]);
