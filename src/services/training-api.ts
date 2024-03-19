import { Endpoint, HTTPMethod } from '@constants/api';

import {
    NewTrainingType,
    ResTrainingType,
    TrainingListType,
    TransformResTrainingType,
} from '../types/training-types';

import { api } from './api';

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

        addTraining: builder.mutation<void, NewTrainingType>({
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
} = trainingApi;
