import { Endpoint, HTTPMethod } from '@constants/api';
import { api } from './api';
import { NewTrainingType, ResTrainingType, TrainingListType, TransformResTrainingType } from '../types/training-types';

export const trainingApi = api.injectEndpoints({
    endpoints: (builder) => ({
        getTrainings: builder.query<TransformResTrainingType, void>({
            query: () => ({
                url: Endpoint.TRAINING,
            }),
            transformResponse(baseQueryReturnValue: ResTrainingType[]) {
                //console.log('baseQueryReturnValue', baseQueryReturnValue);
                const response = baseQueryReturnValue.reduce(
                    (acc: TransformResTrainingType, item) => {
                        const key = item.date.split('T')[0];
                        //console.log(typeof key, acc[key]);
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
            // providesTags: (result) =>
            //     result
            //         ? [
            //               ...result.map(({ _id }) => ({ type: 'Trainings' as const, _id })),
            //               { type: 'Trainings', id: 'LIST' },
            //           ]
            //         : [{ type: 'Trainings', id: 'LIST' }],
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
} = trainingApi;
