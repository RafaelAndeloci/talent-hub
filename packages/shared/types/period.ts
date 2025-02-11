import { YearMonth } from './year-month';

export interface Period {
    start: YearMonth;
    end: YearMonth | null;
}
