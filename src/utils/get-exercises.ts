import { ResTrainingType } from '../types/training-types';

export const getExercises = (selectedTraining: string, currentTrainings: ResTrainingType[]) => {
  //todo подумать куда лучше его положить
  const copy = JSON.parse(JSON.stringify(currentTrainings)) as ResTrainingType[];
    return copy.find((item) => item.name === selectedTraining)?.exercises || [];
};