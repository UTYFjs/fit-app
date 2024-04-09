import { PayloadAction, createSlice } from '@reduxjs/toolkit';

import { RootState } from './configure-store';
import { InviteType } from '../types/training-types';

type InviteState = {
    inviteList: InviteType[];
};

const initialState: InviteState = {
    inviteList: [],
};
const inviteSlice = createSlice({
    name: 'invite',
    initialState: initialState,
    reducers: {
        setInviteList: (state, { payload }: PayloadAction<InviteType[]>) => {
            state.inviteList = [...state.inviteList, ...payload];
        },
    },
});

export const { setInviteList } = inviteSlice.actions;
export default inviteSlice.reducer;
export const getInviteList = ({ invite }: RootState) => invite.inviteList;
