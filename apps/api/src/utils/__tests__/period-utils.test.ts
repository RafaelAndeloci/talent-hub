import { isValidModelPeriods, sortModelsByPeriod } from '../period-utils';
import validPeriods from './scenarios/validPeriods.json';
import overlappingPeriods from './scenarios/overlappingPeriods.json';
import multipleIsCurrent from './scenarios/multipleIsCurrent.json';
import singleCurrentWithNoEnd from './scenarios/singleCurrentWithNoEnd.json';
import unorderedValidPeriods from './scenarios/unorderedValidPeriods.json';

describe('Period Utils', () => {
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

    test('should correctly sort unordered valid periods', () => {
        const sortedData = sortModelsByPeriod(unorderedValidPeriods);
        expect(sortedData[0].period.start.year).toBe(2022);
        expect(sortedData[0].period.start.month).toBe(1);
    });
});
