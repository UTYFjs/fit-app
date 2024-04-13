import { TrainingListType } from '../types/training-types';

export const getTrainingTagNames = (
    defaultTagList: string[],
    dataTrainingList?: TrainingListType[],
) => {
    if (dataTrainingList) {
        return dataTrainingList.reduce((acc, item) => {
            acc.push(item.name);
            return acc;
        }, defaultTagList);
    }
    return defaultTagList;
};
