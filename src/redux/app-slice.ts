import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import { RootState } from './configure-store'

const appSlice = createSlice({
  name: 'app',
  initialState: {isLoading: false},
  reducers: {
    setLoading: (state, {payload}: PayloadAction<boolean>) => {
      state.isLoading = payload
    }
  }
})

export  const {setLoading} = appSlice.actions
export default appSlice.reducer
export const isLoadingState = ({app}: RootState) => app.isLoading