import { Endpoint, HTTPMethod, baseUrlForImg } from '@constants/api';

import { IChangeTariffRequest, IChangeUserInfo, ITariff, IUserInfo } from '../types/api';

import { api } from './api';
import { setUserInfo } from '@redux/profile-slice';

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
                    () => {};
                }
            },
        }),
        updateUserInfo: builder.mutation<IUserInfo, Partial<IChangeUserInfo>>({
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
                    () => {};
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
        postUserAvatar: builder.mutation<{ name: string; url: string }, { file: FormData }>({
            query: (body) => ({
                url: Endpoint.UPLOAD_IMAGE,
                method: 'POST',
                body: body.file,
            }),
            async onQueryStarted(_, { dispatch, queryFulfilled }) {
                try {
                    const { data } = await queryFulfilled;
                    const url = `${baseUrlForImg}/${data.url}`;
                    dispatch(setUserInfo({ imgSrc: url }));
                } catch {
                    () => {};
                }
            },
        }),
    }),
});

export const {
    useLazyGetUserInfoQuery,
    useGetUserInfoQuery,
    useLazyGetTariffListQuery,
    useGetTariffListQuery,
    useUpdateUserInfoMutation,
    useChangeTariffMutation,
    usePostUserAvatarMutation,
} = userProfileApi;
