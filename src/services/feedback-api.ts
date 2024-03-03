import { Endpoint, HTTPMethod } from '@constants/api';
import { api } from './api';
import {
    IFeedback, INewFeedback,
} from '../types/api';

export const feedbackApi = api.injectEndpoints({
    endpoints: (builder) => ({
        getFeedbacks: builder.query<IFeedback[], string>({
            query: () => ({
                url: Endpoint.FEEDBACK,
            }),
            transformResponse(baseQueryReturnValue: IFeedback[]) {
                baseQueryReturnValue.sort(
                    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
                );

                return baseQueryReturnValue.map((item) => {
                    item.createdAt = new Date(item.createdAt).toLocaleDateString('ru-RU', {
                        day: 'numeric',
                        month: 'numeric',
                        year: 'numeric',
                    });
                    return item;
                });
            },
            providesTags: (result) =>
                result
                    ? [
                          ...result.map(({ id }) => ({ type: 'Feedbacks' as const, id })),
                          { type: 'Feedbacks', id: 'LIST' },
                      ]
                    : [{ type: 'Feedbacks', id: 'LIST' }],
        }),
        addFeedback: builder.mutation<IFeedback[], INewFeedback>({
            query: (body) => ({
                url: Endpoint.FEEDBACK,
                method: HTTPMethod.POST,
                body: body,
            }),
            
        }),
    }),
});

export const {
    useGetFeedbacksQuery,
    useAddFeedbackMutation
  } = feedbackApi;
