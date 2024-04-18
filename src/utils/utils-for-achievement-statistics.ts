import { TagTrainingsListType } from '@pages/achievment-page/achievment-page';
import { TrainingListType } from '../types/training-types';

export const initMostFrequentTrainings = (
    dataTrainingList: TrainingListType[],
): Record<string, number> => {
    const mostFrequentTrainings: Record<string, number> =
        dataTrainingList.reduce((acc, item) => {
            const key = item.name;
            acc[key] = 0;
            return acc;
        }, {} as Record<string, number>) || {};

    return mostFrequentTrainings;
};

export const getTextForTitleColumnLEgendChart = (tag: TagTrainingsListType) => {
    switch (tag) {
        case 'Все':
            return 'нагрузка';
        case 'Силовая':
            return 'силовая нагрузка';
        case 'Ноги':
            return 'нагрузка на ноги';
        case 'Грудь':
            return 'нагрузка на грудь';
        case 'Спина':
            return 'нагрузка на спину';
        case 'Руки':
            return 'нагрузка на руки';
        default:
            return 'нагрузка';
    }
};
