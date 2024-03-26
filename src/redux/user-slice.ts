import { PayloadAction, createSlice } from '@reduxjs/toolkit';

import { RootState } from './configure-store';
import { IUserInfo } from '../types/api';

interface IUserState {
    accessToken: string;
    email: string;
    password: string;
    passwordRepeat: string;
    readyForJointTraining: boolean;
    sendNotification: boolean;
}
type IUserValues = Pick<IUserState, 'email' | 'password' | 'passwordRepeat'>;

const initialState: IUserState = {
    accessToken: localStorage.getItem('accessToken') || '',
    email: '',
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
        setUserInfo: (state, { payload }: PayloadAction<IUserInfo>) => {
            (state.email = payload.email),
                (state.readyForJointTraining = payload.readyForJointTraining),
                (state.sendNotification = payload.sendNotification);
        },
    },
});

export const { setAccessToken, setUserValues, setUserInfo } = userSlice.actions;
export default userSlice.reducer;
export const accessTokenState = ({ user }: RootState) => user.accessToken;
export const getUserEmail = ({ user }: RootState) => user.email;
