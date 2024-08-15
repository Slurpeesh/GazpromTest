import { RootState } from '@/app/store'
import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export interface IIsLoadingState {
  value: boolean
}

const initialState: IIsLoadingState = {
  value: true,
}

export const isLoadingSlice = createSlice({
  name: 'isLoading',
  initialState,
  reducers: {
    setLoading: (state, payload: PayloadAction<boolean>) => {
      state.value = payload.payload
    },
  },
})

export const { setLoading } = isLoadingSlice.actions
export const selectIsLoading = (state: RootState) => state.isLoading.value
export default isLoadingSlice.reducer
