import { baseUrl } from '@constants/api';
import { RootState } from '@redux/configure-store';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const api = createApi({
    reducerPath: 'api',
    baseQuery: fetchBaseQuery({ 
        baseUrl: baseUrl,
        prepareHeaders: (headers, {getState}) => {
        const accessToken = (getState() as RootState).user.accessToken
        if(accessToken){
            headers.set('authorization', `Bearer ${accessToken}`);
        }
        return headers;
    } }),
    
    tagTypes: ['User', 'Feedbacks', 'Trainings'],
    endpoints: () => ({ }),
});

