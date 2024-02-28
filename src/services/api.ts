import { baseUrl } from '@constants/api';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const api = createApi({
    reducerPath: 'api',
    baseQuery: fetchBaseQuery({ baseUrl: baseUrl }),
    tagTypes: ['User'],
    endpoints: () => ({ }),
});

