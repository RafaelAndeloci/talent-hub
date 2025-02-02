import { expect, test, describe } from 'vitest';
import validPeriods from './scenarios/validPeriods.json';
import overlappingPeriods from './scenarios/overlappingPeriods.json';
import multipleIsCurrent from './scenarios/multipleIsCurrent.json';
import singleCurrentWithNoEnd from './scenarios/singleCurrentWithNoEnd.json';
import unorderedValidPeriods from './scenarios/unorderedValidPeriods.json';
import { Period } from '../../../src/types/period';
import {
    isValidModelPeriods,
    sortModelsByPeriod,
    isValidPeriod,
} from '../../../src/utils/period-utils';

describe('isValidModelPeriods', () => {
    test('should validate correctly ordered, non-overlapping periods', () => {
        expect(isValidModelPeriods(validPeriods)).toBe(true);
    });

    test('should detect overlapping periods', () => {
        expect(isValidModelPeriods(overlappingPeriods)).toBe(false);
    });

    test('should detect multiple isCurrent entries', () => {
        expect(isValidModelPeriods(multipleIsCurrent)).toBe(false);
    });

    test('should accept a single isCurrent entry with no end date', () => {
        expect(isValidModelPeriods(singleCurrentWithNoEnd)).toBe(true);
    });
});

describe('sortModelsByPeriod', () => {
    test('should correctly sort unordered valid periods', () => {
        const sortedData = sortModelsByPeriod(unorderedValidPeriods);
        expect(sortedData[0].period.start.year).toBe(2022);
        expect(sortedData[0].period.start.month).toBe(1);
    });
});

describe('isValidPeriod', () => {
    test('should return true for a valid period', () => {
        const period: Period = {
            start: { year: 2022, month: 1 },
            end: { year: 2022, month: 2 },
        };

        expect(isValidPeriod({ period, isCurrent: false })).toBe(true);
    });

    test('when period has no end, should return true', () => {
        const period: Period = {
            start: { year: 2022, month: 1 },
            end: null,
        };

        expect(isValidPeriod({ period, isCurrent: false })).toBe(true);
    });
});
