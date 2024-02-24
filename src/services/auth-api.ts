
import { Endpoint, HTTPMethod } from '@constants/api';
import { api } from './api';
import { IRegistrationForm, ILoginRequest } from '../types/api';


// Define a service using a base URL and expected endpoints
export const authApi = api.injectEndpoints({
    endpoints: (builder) => ({
        //todo correct types
        login: builder.mutation<ILoginRequest, IRegistrationForm>({
            query: (body) => ({
                url: Endpoint.LOGIN,
                method: HTTPMethod.POST,
                body: body,
            }),
        }),
        registration: builder.mutation<void, IRegistrationForm>({
            query: (body) => ({
                url: Endpoint.REGISTRATION,
                method: HTTPMethod.POST,
                body: body,
            }),
        }),
    }),
});

// Export hooks for usage in function components, which are
// auto-generated based on the defined endpoints
export const { useLoginMutation ,useRegistrationMutation } = authApi;
