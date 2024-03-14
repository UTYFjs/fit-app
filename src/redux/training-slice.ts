import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { RootState } from './configure-store';

type TrainingStateType =  {
    newTrainings: [];
    trainingsForUpdate: [];
}


const initialState = {
   newTrainings: [],
   trainingsForUpdate: [],
};
const trainingSlice = createSlice({
    name: 'training',
    initialState: initialState,
    reducers: {
        // addNewTraining: (state, { payload }: PayloadAction<string>) => {
        //     state.newTrainings = state.newTrainings.push(payload);
        // },
        // setUserValues: (state, { payload }: PayloadAction<IUserValues>) => {
        //     (state.email = payload.email),
        //         (state.password = payload.password),
        //         (state.passwordRepeat = payload.passwordRepeat);
        // },
    },
});

//export const { setAccessToken, setUserValues } = trainingSlice.actions;
export default trainingSlice.reducer;
//export const accessTokenState = ({ user }: RootState) => user.accessToken;
