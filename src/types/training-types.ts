import { Nullable } from './common-types';

export type ExerciseType = {
    name: string;
    replays: number;
    weight: number;
    approaches: number;
    isImplementation: boolean;
};

export type ParametersTraining = {
    repeat: boolean;
    period: Nullable<number>;
    jointTraining: boolean;
    participants: string[];
};
export type NewTrainingType = {
    name: string;
    date: string;
    isImplementation: boolean;
    exercises: ExerciseType[];
    parameters: ParametersTraining;
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

export type UserJointTrainingListType = {
    id: string;
    name: string;
    trainingType: string;
    imageSrc: Nullable<string>;
    avgWeightInWeek: number;
    status: Nullable<string>;
    inviteId: Nullable<string>;
};

export type InviteType = {
    _id: string;
    from: {
        _id: string;
        firstName: string;
        lastName: string;
        imageSrc: string;
    };
    training: ResTrainingType;
    status: string;
    createdAt: string;
};

export type CreateInviteRequestType = {
    to: string;
    trainingId: string;
};

export type CreateInviteResType = InviteType & {
    to: {
        _id: string;
        firstName: string;
        lastName: string;
        imageSrc: string;
    };
};

export type AnswerInviteType = {
    id: string;
    status: string;
};
