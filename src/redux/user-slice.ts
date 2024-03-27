import { PayloadAction, createSlice } from '@reduxjs/toolkit';

import { RootState } from './configure-store';
import { IUserInfo } from '../types/api';

interface IUserState {
    accessToken: string;
    email: string;
    userInfo: {
        email: string;
        firstName: string;
        lastName: string;
        birthday: string;
        imgSrc: string;
        readyForJointTraining: boolean;
        sendNotification: boolean;
        tariff: {
            tariffId: string;
            expired: string;
        };
    };
    password: string;
    passwordRepeat: string;
}
type IUserValues = Pick<IUserState, 'email' | 'password' | 'passwordRepeat'>;

const initialState: IUserState = {
    accessToken: localStorage.getItem('accessToken') || '',
    email: '',
    userInfo: {
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
    },
    password: '',
    passwordRepeat: '',
};
const userSlice = createSlice({
    name: 'user',
    initialState: initialState,
    reducers: {
        setAccessToken: (state, { payload }: PayloadAction<string>) => {
            state.accessToken = payload;
        },
        setExitApp: () => ({
            ...initialState,
            accessToken: '',
        }),
        setUserValues: (state, { payload }: PayloadAction<IUserValues>) => {
            (state.email = payload.email),
                (state.password = payload.password),
                (state.passwordRepeat = payload.passwordRepeat);
        },
        setUserInfo: (state, { payload }: PayloadAction<Partial<IUserInfo>>) => {
            state.userInfo = {
                ...state.userInfo,
                ...payload,
            };
        },
    },
});

export const { setAccessToken, setUserValues, setUserInfo, setExitApp } = userSlice.actions;
export default userSlice.reducer;
export const getAccessToken = ({ user }: RootState) => user.accessToken;
export const getUserEmail = ({ user }: RootState) => user.email;
export const getUserInfo = ({ user }: RootState) => user.userInfo;
