import { Endpoint, HTTPMethod } from '@constants/api';

import {
    IRegistrationForm,
    ILoginRequest,
    ICheckEmailRequest,
    IConfirmEmailForm,
    IChangePasswordRequest,
    IChangePasswordForm,
} from '../types/api';

import { api } from './api';

export const authApi = api.injectEndpoints({
    endpoints: (builder) => ({
        login: builder.mutation<ILoginRequest, IRegistrationForm>({
            query: (body) => ({
                url: Endpoint.LOGIN,
                method: HTTPMethod.POST,
                body: body,
            }),
        }),
        GoogleAuth: builder.query<{ accessToken: string }, null>({
            query: () => ({
                url: Endpoint.GOOGLE_AUTH,
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

export const {
    useLoginMutation,
    useRegistrationMutation,
    useCheckEmailMutation,
    useConfirmEmailMutation,
    useChangePasswordMutation,
} = authApi;
