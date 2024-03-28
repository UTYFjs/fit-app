import { PayloadAction, createSlice } from '@reduxjs/toolkit';

import { RootState } from './configure-store';

interface IUserState {
    accessToken: string;
    email: string;
    password: string;
    passwordRepeat: string;
}
type IUserValues = Pick<IUserState, 'email' | 'password' | 'passwordRepeat'>;

const initialState: IUserState = {
    accessToken: localStorage.getItem('accessToken') || '',
    email: '',
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
    },
});

export const { setAccessToken, setUserValues, setExitApp } = userSlice.actions;
export default userSlice.reducer;
export const getAccessToken = ({ user }: RootState) => user.accessToken;
export const getUserEmail = ({ user }: RootState) => user.email;
