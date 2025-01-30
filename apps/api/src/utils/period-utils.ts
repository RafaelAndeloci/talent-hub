import moment from 'moment';
import { Period } from '../types/period';

type ModelWithPeriod = { period: Period };

export const sortModelsByPeriod = (models: ModelWithPeriod[]): ModelWithPeriod[] =>
    [...models].sort(({ period: { start: leftStart } }, { period: { start: rightStart } }) => {
        const aStart = moment.utc(`${leftStart.year}-${leftStart.month}-01`);
        const bStart = moment.utc(`${rightStart.year}-${rightStart.month}-01`);

        return aStart.diff(bStart);
    });

export const validatePeriodsOverlap = (models: ModelWithPeriod[]): boolean => {
    if (models.length === 0) {
        return true;
    }

    const sortedModels = sortModelsByPeriod(models);

    return sortedModels.every((model, index) => {
        if (index === sortedModels.length - 1) {
            return true;
        }

        const previousModel = sortedModels[index - 1];

        if (!previousModel.period.end) {
            return false;
        }

        const previousEnd = moment.utc(
            `${previousModel.period.end.year}-${previousModel.period.end.month}-01`,
        );
        const currentStart = moment.utc(
            `${model.period.start.year}-${model.period.start.month}-01`,
        );

        return previousEnd.isBefore(currentStart);
    });
};
