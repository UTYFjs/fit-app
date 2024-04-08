import { ResTrainingType } from '../types/training-types';

export type PeriodOptionsType = {
    label: string;
    value: number;
};

export enum TrainingsInviteMessage {
    'Ноги' = 'тренировок на ноги',
    'Руки' = 'тренировок на руки',
    'Силовая' = 'силовых тренировок',
    'Спина' = 'тренировок на спину',
    'Грудь' = 'тренировок на грудь',
}

export const PeriodOptions: PeriodOptionsType[] = [
    { label: 'Через 1 день', value: 1 },
    { label: 'Через 2 дня', value: 2 },
    { label: 'Через 3 дня', value: 3 },
    { label: 'Через 4 дня', value: 4 },
    { label: 'Через 5 дней', value: 5 },
    { label: 'Через 6 дней', value: 6 },
    { label: '1 раз в неделю', value: 7 },
];

export const defaultExercise = {
    name: '',
    replays: 1,
    weight: 0,
    approaches: 1,
    isImplementation: false,
};

export const defaultParameters = {
    jointTraining: false,
    participants: [],
    period: null,
    repeat: false,
};
export const defaultTraining: ResTrainingType = {
    _id: '',
    date: '',
    isImplementation: false,
    name: '',
    userId: '',
    parameters: defaultParameters,
    exercises: [defaultExercise],
};

export const enum PartnerStatus {
    ACCEPTED = 'accepted',
    REJECTED = 'rejected',
    PENDING = 'pending',
}
