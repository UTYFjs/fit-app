import { PeriodOptions } from '@constants/training';

export const getPeriodTextByValue = (period: number | null) => {
    const result = PeriodOptions.find((item) => item.value === period);
    return result ? result.label : '';
};
