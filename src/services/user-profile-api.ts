import { Endpoint, HTTPMethod } from '@constants/api';

import { IChangeTariffRequest, IChangeUserInfo, ITariff, IUserInfo } from '../types/api';

import { api } from './api';
import { setUserInfo } from '@redux/user-slice';

export const userProfileApi = api.injectEndpoints({
    endpoints: (builder) => ({
        getUserInfo: builder.query<IUserInfo, void>({
            query: () => ({
                url: Endpoint.USER_ME,
            }),
            async onQueryStarted(_, { dispatch, queryFulfilled }) {
                try {
                    const { data } = await queryFulfilled;
                    dispatch(setUserInfo(data));
                } catch {
                    console.log('something went wrong');
                }
            },
            // providesTags: (result) =>
            //     result
            //         ? [
            //               ...result.map(({ id }) => ({ type: 'Feedbacks' as const, id })),
            //               { type: 'Feedbacks', id: 'LIST' },
            //           ]
            //         : [{ type: 'Feedbacks', id: 'LIST' }],
        }),
        updateUserInfo: builder.mutation<IUserInfo, IChangeUserInfo>({
            query: (body) => ({
                url: Endpoint.USER,
                method: HTTPMethod.PUT,
                body: body,
            }),
            async onQueryStarted(_, { dispatch, queryFulfilled }) {
                try {
                    const { data } = await queryFulfilled;
                    dispatch(setUserInfo(data));
                } catch {
                    console.log('something went wrong');
                }
            },
        }),
        getTariffList: builder.query<ITariff[], void>({
            query: () => ({
                url: Endpoint.TARIFF_LIST,
            }),
        }),
        changeTariff: builder.mutation<null, IChangeTariffRequest>({
            query: (body) => ({
                url: Endpoint.TARIFF,
                method: HTTPMethod.POST,
                body: body,
            }),
        }),
    }),
});

export const {
    useGetUserInfoQuery,
    useLazyGetTariffListQuery,
    useUpdateUserInfoMutation,
    useChangeTariffMutation,
} = userProfileApi;
