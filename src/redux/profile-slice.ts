import { PayloadAction, createSlice } from '@reduxjs/toolkit';

import { RootState } from './configure-store';
import { IUserInfo } from '../types/api';

const initialState: IUserInfo = {
    email: '',
    firstName: '',
    lastName: '',
    birthday: '',
    imgSrc: '',
    readyForJointTraining: false,
    sendNotification: false,
    tariff: {
        tariffId: '',
        expired: '',
    },
};
const userInfoSlice = createSlice({
    name: 'userInfo',
    initialState: initialState,
    reducers: {
        setExitAppUserInfo: () => ({
            ...initialState,
        }),
        setUserInfo: (state, { payload }: PayloadAction<Partial<IUserInfo>>) => ({
            ...state,
            ...payload,
        }),
        setExitAppProfile: () => ({
            ...initialState,
        }),
    },
});

export const { setUserInfo, setExitAppUserInfo, setExitAppProfile } = userInfoSlice.actions;
export default userInfoSlice.reducer;
export const getUserInfo = ({ userInfo }: RootState) => userInfo;
