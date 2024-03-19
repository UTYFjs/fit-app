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
};
export type TransformResTrainingType = Record<string, ResTrainingType[]>;

export type TrainingNames = 'Ноги' | 'Руки' | 'Силовая' | 'Спина' | 'Грудь';
export type TrainingListType = {
    name: TrainingNames;
    key: 'legs' | 'hands' | 'strength' | 'back' | 'chest';
};
