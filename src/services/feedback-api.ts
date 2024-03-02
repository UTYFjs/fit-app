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
            transformResponse(baseQueryReturnValue: IFeedback[]) {
                 
                baseQueryReturnValue.sort((a,b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
                
                 return baseQueryReturnValue.map((item) => {
                    item.createdAt = new Date(item.createdAt).toLocaleDateString( "ru-RU" ,{day: 'numeric',month: 'numeric',year: 'numeric'});
                return item;
                }
                );                
            
            },
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
