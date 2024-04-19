import { TagTrainingsListType } from '@pages/achievment-page/achievment-page';
import { TrainingListType } from '../types/training-types';

export const getTrainingTagNames = (dataTrainingList?: TrainingListType[]) => {
    const defaultTagList: TagTrainingsListType[] = ['Все'];
    if (dataTrainingList) {
        return dataTrainingList.reduce((acc, item) => {
            acc.push(item.name);
            return acc;
        }, defaultTagList);
    }
    return defaultTagList;
};
