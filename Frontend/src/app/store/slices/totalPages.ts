import { RootState } from '@/app/store'
import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export interface ITotalPagesState {
  value: number
}

const initialState: ITotalPagesState = {
  value: 1,
}

export const totalPagesSlice = createSlice({
  name: 'totalPages',
  initialState,
  reducers: {
    setTotalPages: (state, payload: PayloadAction<number>) => {
      state.value = payload.payload
    },
  },
})

export const { setTotalPages } = totalPagesSlice.actions
export const selectTotalPages = (state: RootState) => state.totalPages.value
export default totalPagesSlice.reducer
