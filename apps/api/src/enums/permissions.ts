import { Role } from '../api/users/types/enums/role';
import { Action } from './action';
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
                    Action.update,
                    Action.readById,
                    Action.candidateSetBanner,
                    Action.candidateUpdateCv,
                ],
            },
            {
                resource: Resource.users,
                actions: [
                    Action.create,
                    Action.userRequestChangePasswordToken,
                    Action.userAuth,
                    Action.userConfirmEmail,
                    Action.userSetProfilePicture,
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
            {
                resource: Resource.skills,
                actions: [Action.readAll, Action.readById, Action.create],
            },
        ],
    },
    {
        role: Role.sysAdmin,
        actionsPerResource: AllResources.map((r) => ({
            resource: r,
            actions: Object.values(Action),
        })),
    },
] as Permission[]);
