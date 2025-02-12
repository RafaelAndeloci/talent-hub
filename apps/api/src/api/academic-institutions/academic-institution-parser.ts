import {
    AcademicInstitution,
    AcademicInstitutionDto,
    CreateAcademicInstitutionPayload,
    Role,
    SuggestionStatus,
} from '@talent-hub/shared';
import { AcademicInstitutionModelAttr } from '../../types/academic-institution-model-attr';
import _ from 'lodash';
import * as uuid from 'uuid';

export const AcademicInstitutionParser = {
    toDatabase: (academicInstitution: AcademicInstitution): AcademicInstitutionModelAttr => {
        const { validation, ...rest } = academicInstitution;
        return {
            ...rest,
            validatedBy: validation?.by ?? null,
            validatedAt: validation?.at ?? null,
        };
    },

    fromDatabase: (academicInstitutionModel: AcademicInstitutionModelAttr): AcademicInstitution => {
        const { validatedBy, validatedAt, ...rest } = academicInstitutionModel;
        return {
            ...rest,
            validation:
                validatedAt && validatedBy
                    ? {
                          by: validatedBy,
                          at: validatedAt,
                      }
                    : null,
        };
    },

    newInstance: ({
        payload,
        userRole,
    }: {
        payload: CreateAcademicInstitutionPayload;
        userRole: Role;
    }): AcademicInstitution => {
        return {
            id: uuid.v4(),
            ...payload,
            status:
                userRole === Role.SysAdmin ? SuggestionStatus.Approved : SuggestionStatus.Pending,
            validation: null,
        };
    },

    toDto: (a: AcademicInstitution) => _.omit(a, ['validation']) as AcademicInstitutionDto,
};
