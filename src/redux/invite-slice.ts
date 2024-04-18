import { PayloadAction, createSlice } from '@reduxjs/toolkit';

import { RootState } from './configure-store';
import { InviteType } from '../types/training-types';

type InviteState = {
    inviteList: InviteType[];
    countInvites: number;
};

const initialState: InviteState = {
    inviteList: [],
    countInvites: 0,
};
const inviteSlice = createSlice({
    name: 'invite',
    initialState: initialState,
    reducers: {
        setInviteList: (state, { payload }: PayloadAction<InviteType[]>) => {
            state.inviteList = payload;
        },
        setCountInvites: (state, { payload }: PayloadAction<number>) => {
            state.countInvites = payload;
        },
        deleteInviteItem: (state, { payload }: PayloadAction<string>) => {
            state.inviteList = state.inviteList.filter((invite) => invite._id !== payload);
        },
        setExitAppInvite: () => ({
            ...initialState,
        }),
    },
});

export const { setInviteList, setCountInvites, deleteInviteItem, setExitAppInvite } =
    inviteSlice.actions;
export default inviteSlice.reducer;
export const getInviteList = ({ invite }: RootState) => invite.inviteList;
export const getCountInvites = ({ invite }: RootState) => invite.countInvites;
