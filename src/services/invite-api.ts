import { Endpoint, HTTPMethod } from '@constants/api';

import {
    AnswerInviteType,
    CreateInviteRequestType,
    CreateInviteResType,
    InviteType,
} from '../types/training-types';

import { api } from './api';
import { setInviteList } from '@redux/invite-slice';

export const inviteApi = api.injectEndpoints({
    endpoints: (builder) => ({
        getInviteList: builder.query<InviteType[], void>({
            query: () => ({
                url: Endpoint.INVITE,
            }),
            async onQueryStarted(_, { dispatch, queryFulfilled }) {
                try {
                    const { data } = await queryFulfilled;
                    dispatch(setInviteList(data));
                    console.log('сетнулась в редакс InviteList');
                } catch {
                    () => {};
                }
            },
            //todo
            providesTags: (result) =>
                result
                    ? [
                          ...result.map(({ _id }) => ({ type: 'Invites' as const, _id })),
                          { type: 'Invites', id: 'LIST' },
                      ]
                    : [{ type: 'Invites', id: 'LIST' }],
        }),

        createInvite: builder.mutation<CreateInviteResType, CreateInviteRequestType>({
            query: (body) => ({
                url: Endpoint.INVITE,
                method: HTTPMethod.POST,
                body: body,
            }),
        }),
        answerInvite: builder.mutation<CreateInviteResType, AnswerInviteType>({
            query: (body) => ({
                url: Endpoint.INVITE,
                method: HTTPMethod.PUT,
                body: body,
            }),
        }),
        deleteInvite: builder.mutation<void, string>({
            query: (inviteId) => ({
                url: `${Endpoint.INVITE}/${inviteId}`,
                method: HTTPMethod.DELETE,
            }),
        }),
    }),
});

export const {
    useLazyGetInviteListQuery,
    useGetInviteListQuery,
    useCreateInviteMutation,
    useAnswerInviteMutation,
    useDeleteInviteMutation,
} = inviteApi;
