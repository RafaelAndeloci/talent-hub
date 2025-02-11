import { Role } from '@talent-hub/shared';
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
        role: Role.Candidate,
        actionsPerResource: [
            {
                resource: Resource.Candidates,
                actions: [
                    Action.Create,
                    Action.update,
                    Action.ReadById,
                    Action.candidateSetBanner,
                    Action.candidateUpdateCv,
                ],
            },
            {
                resource: Resource.Users,
                actions: [
                    Action.Create,
                    Action.UserRequestChangePasswordToken,
                    Action.UserAuth,
                    Action.UserConfirmEmail,
                    Action.UserSetProfilePicture,
                ],
            },
            {
                resource: Resource.Companies,
                actions: [Action.ReadById, Action.ReadAll],
            },
            {
                resource: Resource.JobOpenings,
                actions: [Action.ReadAll, Action.ReadById],
            },
            {
                resource: Resource.JobApplications,
                actions: [Action.Create, Action.ReadAll, Action.ReadById],
            },
            {
                resource: Resource.Skills,
                actions: [Action.ReadAll, Action.ReadById, Action.Create],
            },
        ],
    },
    {
        role: Role.SysAdmin,
        actionsPerResource: AllResources.map((r) => ({
            resource: r,
            actions: Object.values(Action),
        })),
    },
] as Permission[]);
