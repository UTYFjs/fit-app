import { PayloadAction, createSlice } from '@reduxjs/toolkit';

import { RootState } from './configure-store';
import { ResTrainingType, TrainingNames, UserJointTrainingListType } from '../types/training-types';
import { defaultExercise, defaultTraining } from '@constants/training';

type TrainingState = {
    currentTraining: ResTrainingType;
    availableTrainingNames: string[];
    alertMessage: string;
    userJointTrainingList: UserJointTrainingListType[];
    partnersList: UserJointTrainingListType[];
};

const initialState: TrainingState = {
    currentTraining: defaultTraining,
    availableTrainingNames: [],
    userJointTrainingList: [],
    partnersList: [],
    alertMessage: '',
};
const trainingSlice = createSlice({
    name: 'training',
    initialState: initialState,
    reducers: {
        setAvailableTrainingNames: (state, { payload }: PayloadAction<string[]>) => {
            state.availableTrainingNames = payload;
        },
        setCurrentTraining: (state, { payload }: PayloadAction<ResTrainingType>) => {
            state.currentTraining = payload;
        },
        updateNameCurrentTraining: (state, { payload }: PayloadAction<TrainingNames>) => {
            state.currentTraining.name = payload;
        },
        updateDateCurrentTraining: (state, { payload }: PayloadAction<string>) => {
            state.currentTraining.date = payload;
        },
        updatePeriodCurrentTraining: (state, { payload }: PayloadAction<number | null>) => {
            state.currentTraining.parameters.period = payload;
            if (payload !== null) state.currentTraining.parameters.repeat = true;
        },
        updateExerciseNameCurrentTraining: (
            state,
            { payload }: PayloadAction<{ value: string; index: number }>,
        ) => {
            state.currentTraining.exercises[payload.index].name = payload.value;
        },
        updateExerciseApproachesCurrentTraining: (
            state,
            { payload }: PayloadAction<{ value: number; index: number }>,
        ) => {
            state.currentTraining.exercises[payload.index].approaches = payload.value;
        },
        updateExerciseWeightCurrentTraining: (
            state,
            { payload }: PayloadAction<{ value: number; index: number }>,
        ) => {
            state.currentTraining.exercises[payload.index].weight = payload.value;
        },
        updateExerciseReplaysCurrentTraining: (
            state,
            { payload }: PayloadAction<{ value: number; index: number }>,
        ) => {
            state.currentTraining.exercises[payload.index].replays = payload.value;
        },
        addNewExerciseToCurrentTraining: (state) => {
            state.currentTraining.exercises.push(defaultExercise);
        },
        removeExercises: (state, { payload }: PayloadAction<number[]>) => {
            state.currentTraining.exercises = state.currentTraining.exercises.filter(
                (_, index) => !payload.includes(index),
            );
        },
        clearCurrentTraining: (state) => {
            state.currentTraining = defaultTraining;
        },
        setUserJointTrainingList: (
            state,
            { payload }: PayloadAction<UserJointTrainingListType[]>,
        ) => {
            state.userJointTrainingList = payload;
        },
        updateStatusUserJointTrainingList: (
            state,
            { payload }: PayloadAction<UserJointTrainingListType>,
        ) => {
            state.userJointTrainingList = state.userJointTrainingList.map((item) => {
                if (item.id === payload.id) {
                    return payload;
                }
                return item;
            });
        },
        setPartnersList: (state, { payload }: PayloadAction<UserJointTrainingListType[]>) => {
            state.partnersList = payload;
        },
        addPartnerToList: (state, { payload }: PayloadAction<UserJointTrainingListType>) => {
            state.partnersList.push(payload);
        },
        deletePartnerFromList: (state, { payload }: PayloadAction<string>) => {
            state.partnersList = state.partnersList.filter((partner) => partner.id !== payload);
        },
        setAlertMessage: (state, { payload }: PayloadAction<string>) => {
            state.alertMessage = payload;
        },
    },
});

export const {
    setAvailableTrainingNames,
    setCurrentTraining,
    updateNameCurrentTraining,
    updateDateCurrentTraining,
    updatePeriodCurrentTraining,
    updateExerciseNameCurrentTraining,
    updateExerciseApproachesCurrentTraining,
    addNewExerciseToCurrentTraining,
    updateExerciseWeightCurrentTraining,
    updateExerciseReplaysCurrentTraining,
    removeExercises,
    clearCurrentTraining,
    setUserJointTrainingList,
    updateStatusUserJointTrainingList,
    setPartnersList,
    addPartnerToList,
    deletePartnerFromList,
    setAlertMessage,
} = trainingSlice.actions;
export default trainingSlice.reducer;
export const getCurrentTraining = ({ training }: RootState) => training.currentTraining;
export const getAlertMessage = ({ training }: RootState) => training.alertMessage;
export const getUserJointTrainingList = ({ training }: RootState) => training.userJointTrainingList;
export const getPartnersList = ({ training }: RootState) => training.partnersList;
