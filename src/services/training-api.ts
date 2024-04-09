import { Endpoint, HTTPMethod } from '@constants/api';

import {
    NewTrainingType,
    ResTrainingType,
    TrainingListType,
    TransformResTrainingType,
    UserJointTrainingListType,
} from '../types/training-types';

import { api } from './api';
import {
    setAvailableTrainingNames,
    setPartnersList,
    setUserJointTrainingList,
} from '@redux/training-slice';

export const trainingApi = api.injectEndpoints({
    endpoints: (builder) => ({
        getTrainings: builder.query<TransformResTrainingType, void>({
            query: () => ({
                url: Endpoint.TRAINING,
            }),
            transformResponse(baseQueryReturnValue: ResTrainingType[]) {
                const response = baseQueryReturnValue.reduce(
                    (acc: TransformResTrainingType, item) => {
                        const key = new Date(item.date).toISOString().split('T')[0];
                        if (acc[key]?.length > 0) {
                            acc[key].push(item);
                        } else {
                            acc[key] = [];
                            acc[key].push(item);
                        }
                        return acc;
                    },
                    {},
                );
                return response;
            },
            providesTags: ['Trainings'],
        }),

        addTraining: builder.mutation<ResTrainingType, NewTrainingType>({
            query: (body) => ({
                url: Endpoint.TRAINING,
                method: HTTPMethod.POST,
                body: body,
            }),
        }),
        updateTraining: builder.mutation<ResTrainingType[], ResTrainingType>({
            query: ({ _id, ...rest }) => ({
                url: `${Endpoint.TRAINING}/${_id}`,
                method: HTTPMethod.PUT,
                body: rest,
            }),
        }),
        deleteTraining: builder.mutation<void, string>({
            query: (trainingId) => ({
                url: `${Endpoint.TRAINING}/${trainingId}`,
                method: HTTPMethod.DELETE,
                body: {},
            }),
        }),
        getTrainingList: builder.query<TrainingListType[], void>({
            query: () => ({
                url: Endpoint.TRAINING_LIST,
            }),
            async onQueryStarted(_, { dispatch, queryFulfilled }) {
                try {
                    const { data } = await queryFulfilled;
                    dispatch(setAvailableTrainingNames(data.map((item) => item.name)));
                } catch {
                    () => {
                        console.log('error request Training List');
                    };
                }
            },
        }),
        getUserJointTrainingList: builder.query<
            UserJointTrainingListType[],
            { trainingType?: string; status?: string }
        >({
            query: (body) => ({
                url: Endpoint.USER_JOINT_TRAINING_LIST,
                params: body,
            }),
            onQueryStarted: async (_, { dispatch, queryFulfilled }) => {
                try {
                    const { data } = await queryFulfilled;
                    dispatch(setUserJointTrainingList(data));
                    console.log('данные пользователей', data);
                } catch {
                    () => {};
                }
            },
        }),
        getTrainingPals: builder.query<UserJointTrainingListType[], void>({
            query: () => ({
                url: Endpoint.TRAINING_PALS,
            }),
            onQueryStarted: async (_, { dispatch, queryFulfilled }) => {
                try {
                    const { data } = await queryFulfilled;
                    dispatch(setPartnersList(data));
                    console.log('данные совместных пользователей', data);
                } catch {
                    () => {};
                }
            },
        }),
    }),
});

export const {
    useGetTrainingsQuery,
    useLazyGetTrainingsQuery,
    useAddTrainingMutation,
    useUpdateTrainingMutation,
    useDeleteTrainingMutation,
    useGetTrainingListQuery,
    useLazyGetTrainingListQuery,
    useLazyGetUserJointTrainingListQuery,
    useGetTrainingPalsQuery,
    useLazyGetTrainingPalsQuery,
} = trainingApi;
