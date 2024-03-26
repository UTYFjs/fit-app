import { PayloadAction, createSlice } from '@reduxjs/toolkit';

import { RootState } from './configure-store';
import { IUserInfo } from '../types/api';

interface IUserState {
    accessToken: string;
    email: string;
    firstName: string;
    lastName: string;
    birthday: string;
    imgSrc: string;
    tariff: {
        tariffId: string;
        expired: string;
    };
    password: string;
    passwordRepeat: string;
    readyForJointTraining: boolean;
    sendNotification: boolean;
}
type IUserValues = Pick<IUserState, 'email' | 'password' | 'passwordRepeat'>;

const initialState: IUserState = {
    accessToken: localStorage.getItem('accessToken') || '',
    email: '',
    firstName: '',
    lastName: '',
    birthday: '',
    imgSrc: '',
    tariff: {
        tariffId: '',
        expired: '',
    },
    password: '',
    passwordRepeat: '',
    readyForJointTraining: false,
    sendNotification: false,
};
const userSlice = createSlice({
    name: 'user',
    initialState: initialState,
    reducers: {
        setAccessToken: (state, { payload }: PayloadAction<string>) => {
            state.accessToken = payload;
        },
        setUserValues: (state, { payload }: PayloadAction<IUserValues>) => {
            (state.email = payload.email),
                (state.password = payload.password),
                (state.passwordRepeat = payload.passwordRepeat);
        },
        setUserInfo: (state, { payload }: PayloadAction<Partial<IUserInfo>>) => ({
            ...state,
            ...payload,
            // (state.email = payload.email),
            //     (state.readyForJointTraining = payload.readyForJointTraining),
            //     (state.sendNotification = payload.sendNotification);
        }),
    },
});

export const { setAccessToken, setUserValues, setUserInfo } = userSlice.actions;
export default userSlice.reducer;
export const getAccessToken = ({ user }: RootState) => user.accessToken;
export const getUserEmail = ({ user }: RootState) => user.email;
export const getUserInfo = ({ user }: RootState) => ({
    email: user.email,
    firstName: user.firstName,
    lastName: user.lastName,
    birthday: user.birthday,
    imgSrc: user.imgSrc,
});
