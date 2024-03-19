import { ResTrainingType, TrainingListType, TrainingNames } from '../types/training-types';

export const getSelectedTrainings = (
    trainingList: TrainingListType[],
    currentTrainings: ResTrainingType[],
    selectedTraining: TrainingNames,
    isEditTraining: boolean,
) => {
    const options = trainingList
        .filter((item) => !currentTrainings.some((curr) => curr.name === item.name))
        .map(({ name }) => ({ value: name, label: name }));
    if (isEditTraining) {
        options.push({ value: selectedTraining, label: selectedTraining });
    }

    return options;
};
