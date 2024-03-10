import { Endpoint, HTTPMethod } from '@constants/api';
import { api } from './api';
import { NewTrainingType, ResTrainingType, TrainingListType } from '../types/training-types';

export const trainingApi = api.injectEndpoints({
    endpoints: (builder) => ({
        getTrainings: builder.query<ResTrainingType[], void>({
            query: () => ({
                url: Endpoint.TRAINING,
            }),
            // transformResponse(baseQueryReturnValue: ResTrainingType[]) {
            //     baseQueryReturnValue.sort(
            //         (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
            //     );

            //     return baseQueryReturnValue.map((item) => {
            //         item.createdAt = new Date(item.createdAt).toLocaleDateString('ru-RU', {
            //             day: 'numeric',
            //             month: 'numeric',
            //             year: 'numeric',
            //         });
            //         return item;
            //     });
            // },
            providesTags: (result) =>
                result
                    ? [
                          ...result.map(({ _id }) => ({ type: 'Trainings' as const, _id })),
                          { type: 'Trainings', id: 'LIST' },
                      ]
                    : [{ type: 'Trainings', id: 'LIST' }],
        }),
        addTraining: builder.mutation<void, NewTrainingType>({
            query: (body) => ({
                url: Endpoint.TRAINING,
                method: HTTPMethod.POST,
                body: body,
            }),
        }),
        updateTraining: builder.mutation<ResTrainingType[], Omit<ResTrainingType, 'userId'>>({
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
} = trainingApi;
