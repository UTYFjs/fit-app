import { PeriodValues } from '@pages/achievment-page/achievment-page';

export const getMaxWidthColumnChart = (isDesktop: boolean, period: number): number | string => {
    if (period === PeriodValues.perMonth) return '100%';
    return isDesktop ? 520 : 328;
};
