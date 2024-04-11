import { PeriodOptions } from '@constants/training';
import { Nullable } from '../types/common-types';

export const getPeriodTextByValue = (period: Nullable<number>) => {
    const result = PeriodOptions.find((item) => item.value === period);
    return result ? result.label : '';
};
