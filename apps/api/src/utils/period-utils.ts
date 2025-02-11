import { Period, YearMonth } from '@talent-hub/shared/types';

export interface ModelWithPeriod {
    period: Period;
    isCurrent: boolean;
}

const comparePeriods = (left: YearMonth, right: YearMonth): number => {
    if (left.year !== right.year) {
        return left.year - right.year;
    }
    return left.month - right.month;
};

export const sortModelsByPeriod = <T extends ModelWithPeriod>(models: T[]): T[] => {
    return [...models].sort((a, b) => comparePeriods(a.period.start, b.period.start));
};

const periodsDoNotOverlap = (models: ModelWithPeriod[]): boolean => {
    for (let i = 0; i < models.length - 1; i++) {
        const current = models[i];
        const next = models[i + 1];

        if (!current.period.end) {
            return i === models.length - 2;
        }

        const isOverlapping = comparePeriods(current.period.end, next.period.start) > 0;
        if (isOverlapping) {
            return false;
        }
    }
    return true;
};

export const isValidPeriod = <T extends ModelWithPeriod>({ period: { start, end } }: T): boolean =>
    !end || comparePeriods(start, end) <= 0;

export const isValidModelPeriods = <T extends ModelWithPeriod>(models: T[]): boolean => {
    if (!models.every(isValidPeriod)) {
        return false;
    }

    if (models.length <= 1) {
        return true;
    }

    const sortedModels = sortModelsByPeriod(models);

    const currentModels = sortedModels.filter((model) => model.isCurrent);
    if (currentModels.length > 1) {
        return false;
    }

    return periodsDoNotOverlap(sortedModels);
};
