import { Endpoint } from '@constants/api';
import { api } from './api';
import {
    IFeedback,
} from '../types/api';

export const feedbackApi = api.injectEndpoints({
    endpoints: (builder) => ({
        getFeedbacks: builder.query<IFeedback[], string>({
            query: () => ({
                url: Endpoint.FEEDBACK,
            }),
            providesTags: (result) =>
                result
                    ? [
                          ...result.map(({ id }) => ({ type: 'Feedbacks' as const, id })),
                          { type: 'Feedbacks', id: 'LIST' },
                      ]
                    : [{ type: 'Feedbacks', id: 'LIST' }],
        }),
    }),
});

export const {
    useGetFeedbacksQuery,
  } = feedbackApi;
