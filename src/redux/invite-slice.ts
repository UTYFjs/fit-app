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
            state.inviteList = payload;
        },
        deleteInviteItem: (state, { payload }: PayloadAction<string>) => {
            state.inviteList = state.inviteList.filter((invite) => invite._id !== payload);
        },
        setExitAppInvite: () => ({
            ...initialState,
        }),
    },
});

export const { setInviteList, deleteInviteItem, setExitAppInvite } = inviteSlice.actions;
export default inviteSlice.reducer;
export const getInviteList = ({ invite }: RootState) => invite.inviteList;
