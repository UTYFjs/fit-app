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
    parameters: {
        repeat: boolean;
        period: number;
        jointTraining: boolean;
        participants: string[];
    };
    exercises: ExerciseType[];
};

export type ResTrainingType = NewTrainingType & {
  _id: string;
  userId: string;

}
export type TrainingListType = {
  name: string;
  key: string;
}