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
