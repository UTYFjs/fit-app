import { TransformResTrainingType } from '.././types/training-types';
enum TrainingType {
    'Ноги' = 'legs',
    'Руки' = 'hands',
    'Силовая' = 'strength',
    'Спина' = 'back',
    'Грудь' = 'chest',
}
export const getFavoriteTraining = (userTrainings: TransformResTrainingType) => {
    const trainings = Object.values(userTrainings).flat();

    const trainingWeight: Record<string, number> = {};

    trainings.forEach((item) => {
        if (!Object.prototype.hasOwnProperty.call(trainingWeight, item.name)) {
            trainingWeight[item.name] = 0;
        }
        item.exercises.forEach((exercice) => {
            const value = exercice.approaches * exercice.replays * exercice.weight;
            trainingWeight[item.name] = trainingWeight[item.name] + value;
        });
    });

    let maxTrainingValue = -1;
    let maxTrainingName = '';

    Object.entries(trainingWeight).forEach(([name, value]) => {
        if (value > maxTrainingValue) {
            maxTrainingValue = value;
            maxTrainingName = name;
        }
    });

    return TrainingType[maxTrainingName as keyof typeof TrainingType];
};
