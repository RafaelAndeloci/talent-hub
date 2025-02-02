import _ from 'lodash';
import * as uuid from 'uuid';

import { JobOpeningParser } from './types/job-opening-parser';
import { Role } from '../users/types/enums/role';
import { JobOpeningStatus } from './types/enums/job-opening-status';

export const jobOpeningParser: JobOpeningParser = {
    toDto: ({ jobOpening, role }) =>
        role === Role.candidate ? _.omit(jobOpening, ['selectedApplicationId']) : jobOpening,

    newInstance: ({ payload }) => ({
        id: uuid.v4(),
        title: payload.title,
        description: payload.description,
        status: JobOpeningStatus.draft,
        companyId: payload.companyId,
        selectedApplicationId: null,
        positionLevel: payload.positionLevel,
        workplaceType: payload.workplaceType,
        employmentType: payload.employmentType,
        salary: payload.salary,
        contractType: payload.contractType,
        benefits: payload.benefits,
        deadline: payload.deadline,
        responsibilities: payload.responsibilities,
        requirements: payload.requirements,
    }),
};
