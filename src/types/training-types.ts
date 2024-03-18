export type ExerciseType = {
    name: string;
    replays: number;
    weight: number;
    approaches: number;
    isImplementation: boolean;
};

export type NewTrainingType = {
    name: string;
    date: string;
    isImplementation: boolean;
    exercises: ExerciseType[];
};

export type ResTrainingType = NewTrainingType & {
  _id: string;
  userId: string;
}
export type TransformResTrainingType = Record<string, ResTrainingType[]>

export type TrainingListType = {
    name: 'Ноги' | 'Руки' | 'Силовая' | 'Спина' | 'Грудь';
    key: 'legs' | 'hands' | 'strength' | 'back' | 'chest';
};