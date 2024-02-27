
import { Endpoint, HTTPMethod } from '@constants/api';
import { api } from './api';
import { IRegistrationForm, ILoginRequest, ICheckEmailRequest, IConfirmEmailForm, IChangePasswordRequest, IChangePasswordForm } from '../types/api';



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
        checkEmail: builder.mutation<ICheckEmailRequest, Pick<IRegistrationForm, 'email'>>({
            query: (body) => ({
                url: Endpoint.CHECK_EMAIL,
                method: HTTPMethod.POST,
                body: body,
                credentials: 'include',
            }),
        }),
        confirmEmail: builder.mutation<ICheckEmailRequest, IConfirmEmailForm>({
            query: (body) => ({
                url: Endpoint.CONFIRM_EMAIL,
                method: HTTPMethod.POST,
                body: body,
                credentials: 'include',
            }),
        }),
        changePassword: builder.mutation<IChangePasswordRequest, IChangePasswordForm>({
            query: (body) => ({
                url: Endpoint.CHANGE_PASSWORD,
                method: HTTPMethod.POST,
                body: body,
                credentials: 'include',
            }),
        }),
    }),
});

// Export hooks for usage in function components, which are
// auto-generated based on the defined endpoints
export const { useLoginMutation ,useRegistrationMutation, useCheckEmailMutation, useConfirmEmailMutation, useChangePasswordMutation } = authApi;
